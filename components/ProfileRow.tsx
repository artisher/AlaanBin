
export default function ProfileRow({ label, value, isPassword, editable = true, onSave }) {

 

    return (
        <div className="flex items-center justify-between py-3">
            <div className="flex items-center">
                
                <span className="text-sm font-medium text-gray-600">{label}:</span>
            </div>

            <div className="flex items-center">
            
               
                    <span className={`text-sm ${isPassword ? 'font-mono' : 'font-semibold'} text-gray-800`}>
                        {value}
                    </span>
              
            </div>
        </div>
    );
}
