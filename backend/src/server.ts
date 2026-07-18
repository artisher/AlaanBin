import express from 'express';
import bcrypt from "bcryptjs";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";
import cors from 'cors';
import mongoose from 'mongoose';
import { Movie } from './models/Movie';
import { User } from './models/User';
import path from "path";
import checkSubscription from './middleware/auth.middleware';
import { adminMiddleware } from './middleware/admin';
import dotenv from "dotenv";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// تنظیمات امنیتی و پارس کردن داده‌ها
app.use(
    cors({
        origin: process.env.CLIENT_URL,
        credentials: true,
    })
); // اجازه دسترسی از فرانت
app.use(express.json()); // خواندن داده‌های JSON
app.use(cookieParser());
app.use(
    "/videos",
    express.static(path.join(process.cwd(), "videos"))
);
console.log(path.join(process.cwd(), "videos"));


mongoose.connect(process.env.MONGODB_URI!)
    .then(() => console.log('✅ دیتابیس وصل شد!'))
    .catch((err: any) => console.error('❌ خطای اتصال:', err));
// --- API مربوط به یوزرها ---
//admin API
// 1. دریافت همه یوزرها
app.get('/api/admin/users',
    checkSubscription,
    adminMiddleware,
    async (req, res) => {
        try {
            const users = await User.find().select('-password');

            res.json(users);
        } catch (err) {
            res.status(500).json({ message: 'خطا در دریافت یوزرها' });
        }
    });
// 2. اضافه کردن یوزر جدید
app.post('/api/admin/users',
    checkSubscription,
    adminMiddleware, async (req, res) => {
        try {

            const hashedPassword = await bcrypt.hash(req.body.password, 10);

            const newUser = new User({
                ...req.body,
                password: hashedPassword
            });

            const savedUser = await newUser.save();

            res.status(201).json(savedUser);

        } catch (err) {
            if (err instanceof Error) {
                res.status(400).json({
                    message: err.message
                });
            } else {
                res.status(400).json({
                    message: "Unknown error"
                });
            }
        }
    });
// 3. حذف یوزر
app.delete('/api/admin/users/:id',
    checkSubscription,
    adminMiddleware, async (req, res) => {
        try {
            await User.findByIdAndDelete(req.params.id);
            res.json({ message: 'یوزر با موفقیت حذف شد' });
        } catch (err) {
            res.status(500).json({ message: 'خطا در حذف یوزر' });
        }
    });
//ادیت یوزر
app.put(
    "/api/admin/users/:id",
    checkSubscription,
    adminMiddleware,
    async (req, res) => {
        try {
            const { id } = req.params;
            const updateData = { ...req.body };

            // فقط اگر پسورد جدید وارد شده باشد
            if (updateData.password?.trim()) {
                updateData.password = await bcrypt.hash(updateData.password, 10);
            } else {
                delete updateData.password;
            }

            // فیلدهایی که نباید از فرانت تغییر کنند
            delete updateData.role;
            delete updateData._id;
            delete updateData.__v;
            delete updateData.signUpDate;

            const updatedUser = await User.findByIdAndUpdate(
                id,
                updateData,
                {
                    new: true,
                    runValidators: true,
                }
            );

            if (!updatedUser) {
                return res.status(404).json({
                    message: "کاربر یافت نشد",
                });
            }

            // تبدیل به آبجکت و حذف password بدون استفاده از delete
            const { password, ...safeUser } = updatedUser.toObject();

            res.json(safeUser);
        } catch (err) {
            const error = err as Error;

            res.status(500).json({
                message: "خطا در بروزرسانی",
                error: error.message,
            });
        }
    }
);
// 2. اضافه کردن فیلم جدید
app.post('/api/admin/movies',
    checkSubscription,
    adminMiddleware, async (req, res) => {
        try {
            const newMovie = new Movie(req.body);
            const savedMovie = await newMovie.save();
            res.status(201).json(savedMovie);
        } catch (err: any) {
            res.status(400).json({ message: err.message });
        }
    });
// 3. حذف فیلم
app.delete('/api/admin/movies/:id',
    checkSubscription,
    adminMiddleware, async (req, res) => {
        try {
            await Movie.findByIdAndDelete(req.params.id);
            res.json({ message: 'فیلم با موفقیت حذف شد' });
        } catch (err) {
            res.status(500).json({ message: 'خطا در حذف فیلم' });
        }
    });
//ادیت فیلم 
app.put('/api/admin/movies/:id',
    checkSubscription,
    adminMiddleware, async (req, res) => {
        try {
            const updatedMovie = await Movie.findByIdAndUpdate(
                req.params.id,
                req.body,
                {
                    new: true, // نسخه آپدیت شده رو برگردون
                    runValidators: true
                }
            );

            if (!updatedMovie) {
                return res.status(404).json({
                    message: 'فیلم پیدا نشد'
                });
            }

            res.status(200).json(updatedMovie);

        } catch (err: any) {
            res.status(500).json({
                message: err.message || 'خطا در بروزرسانی فیلم'
            });
        }
    });
app.get("/api/admin/movies",
    checkSubscription,
    adminMiddleware,
    async (req, res) => {
        try {
            const movies = await Movie.find().sort({ _id: -1 })

            res.status(200).json({
                success: true,
                movies,
            });
        } catch (err) {
            console.error(err);

            res.status(500).json({
                success: false,
                message: "خطا در دریافت فیلم‌ها",
            });
        }
    }
);
// --- API مربوط به فیلم‌ها ---

// 1. دریافت همه فیلم‌ها

app.get('/api/movies', async (req, res) => {
    const escapeRegex = (text: string) => {
        return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    };
    try {
        // ---------- Filter ----------
        const query: any = {};

        if (req.query.genre) {
            query.genre = req.query.genre;
        }

        if (req.query.product) {
            query.product = req.query.product;
        }

        if (req.query.rating) {
            query.rating = {
                $gte: Number(req.query.rating)
            };
        }
        if (req.query.search) {
            query.$or = [
                {
                    title: {
                        $regex: req.query.search,
                        $options: "i",
                    },
                },
                {
                    description: {
                        $regex: req.query.search,
                        $options: "i",
                    },
                },
            ];
        }
        if (req.query.search) {
            const search = escapeRegex(String(req.query.search));

            query.$or = [
                {
                    title: {
                        $regex: search,
                        $options: "i",
                    },
                },
                {
                    description: {
                        $regex: search,
                        $options: "i",
                    },
                },
            ];
        }
        // پس بخش Filter میشه:
        // ---------- Sort ----------
        let sort: any = {};

        switch (req.query.sort) {
            case "newest":
                sort.year = -1;
                break;

            case "oldest":
                sort.year = 1;
                break;

            case "highRating":
                sort.rating = -1;
                break;

            case "lowRating":
                sort.rating = 1;
                break;

            default:
                sort.year = -1;
        }

        // ---------- Pagination ----------
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 20;

        const totalMovies = await Movie.countDocuments(query);

        const movies = await Movie.find(query)
            .sort(sort)
            .skip((page - 1) * limit)
            .limit(limit);

        res.json({
            movies,
            currentPage: page,
            totalPages: Math.ceil(totalMovies / limit),
            totalMovies
        });

    } catch (err) {
        console.error(err);

        res.status(500).json({
            message: "خطا در دریافت فیلم‌ها"
        });
    }
});


//فیلم مورد علاقه اضافه کردن یا حذف کردن
app.post("/api/favorites/:movieId", async (req, res) => {
    try {
        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({
                message: "احراز هویت نشده"
            });
        }

        const { movieId } = req.params;

        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
            id: string;
        };

        const user = await User.findById(decoded.id);

        if (!user) {
            return res.status(404).json({
                message: "کاربر پیدا نشد"
            });
        }

        const exists = user.favoriteTitle.some(
            id => id.toString() === movieId
        );

        if (!exists) {
            user.favoriteTitle.push(new mongoose.Types.ObjectId(movieId));
        } else {
            user.favoriteTitle = user.favoriteTitle.filter(
                id => id.toString() !== movieId
            );
        }
        await user.save();
        res.json({
            success: true,
            favoriteTitle: user.favoriteTitle
        });

    } catch (err) {
        res.status(500).json({
            message: "خطا"
        });
    }
});
//دریافت فیلم مورد علاقه
app.get("/api/favorites", async (req, res) => {
    try {
        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({
                message: "احراز هویت نشده"
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
            id: string;
        };

        const user = await User.findById(decoded.id);

        if (!user) {
            return res.status(404).json({
                message: "کاربر پیدا نشد"
            });
        }

        const favoriteMovies = await Movie.find({
            _id: { $in: user.favoriteTitle }
        });

        res.json({
            favoriteMovies
        });

    } catch (err) {
        res.status(500).json({
            message: "خطا"
        });
    }
});
//auth 
app.post('/api/auth/register', async (req, res) => {
    try {
        const {
            fullName,
            phoneNumber,
            email,
            password,
            country,
            city
        } = req.body;

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                message: "ایمیل قبلاً ثبت شده"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            fullName,
            phoneNumber,
            email,
            password: hashedPassword,
            country,
            city
        });

        res.status(201).json({
            message: "ثبت نام موفق",
            userId: user._id
        });

    } catch (err) {
        res.status(500).json({
            message: "خطا در ثبت نام"
        });
    }
});
//لاگین
app.post('/api/auth/login', async (req, res) => {
    try {

        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                message: "کاربر یافت نشد"
            });
        }
        console.log("LOGIN PASSWORD:", password);
        console.log("DB HASH:", user.password);
        const isMatch = await bcrypt.compare(
            password,
            user.password
        );
        console.log("MATCH:", isMatch);
        if (!isMatch) {
            return res.status(400).json({
                message: "رمز عبور اشتباه است"
            });
        }

        const token = jwt.sign(
            {
                id: user._id,
                role: user.role
            },
            process.env.JWT_SECRET!,
            {
                expiresIn: "30d"
            }
        );

        res.cookie("token", token, {
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 24 * 30,
            sameSite: "lax", // یا "none" اگر https داری
            secure: false, // در prod باید true بشه
        });
        res.json({
            message: "ورود موفق",
            user: {
                id: user._id,
                fullName: user.fullName,
                email: user.email,
                role: user.role
            }
        });

    } catch (err) {
        res.status(500).json({
            message: "خطا در ورود"
        });
    }
});
//لاگ اوت 
app.post('/api/auth/logout', (req, res) => {
    res.clearCookie("token");

    res.json({
        message: "خروج موفق"
    });
});
//دیتای منو و اکانت 
app.get("/api/auth/me", async (req, res) => {

    try {
        const token = req.cookies.token;


        if (!token) {
            return res.status(401).json({
                isAuthenticated: false,
                message: "احراز هویت نشده"
            });
        }

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET!
        ) as {
            id: string;
            role: string;
        };

        const user = await User.findById(decoded.id)


        if (!user) {
            return res.status(404).json({
                isAuthenticated: false,
                message: "کاربر پیدا نشد"
            });
        }

        res.status(200).json({
            isAuthenticated: true,
            user: {
                _id: user._id,
                fullName: user.fullName,
                phoneNumber: user.phoneNumber,
                email: user.email,
                country: user.country,
                city: user.city,
                role: user.role,
                subscriptionExpireDate: user.subscriptionExpireDate,
                hasActiveSubscription:
                    !!user.subscriptionExpireDate &&
                    new Date(user.subscriptionExpireDate) > new Date(),
            }
        });

    } catch (err) {
        res.status(401).json({
            isAuthenticated: false,
            message: "توکن نامعتبر است"
        });
    }
});

// movie 
app.get("/api/movies/:id",
    checkSubscription,
    async (req, res) => {
        try {
            const id = String(req.params.id);

            if (!mongoose.Types.ObjectId.isValid(id)) {
                return res.status(400).json({
                    message: "Invalid ID"
                });
            }

            const movie = await Movie.findById(id);

            if (!movie) {
                return res.status(404).json({ message: "Movie not found" });
            }

            res.json(movie);

        } catch (err) {
            console.error(err);

            res.status(500).json({ message: "Server error" });
        }
    });
// شروع سرور
app.listen(PORT, () => {
    console.log(`🚀 سرور روی پورت ${PORT} در حال اجراست!`);
    console.log(`📍 آدرس API: http://localhost:${PORT}/api/users`);

});
