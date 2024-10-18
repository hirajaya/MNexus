const Model = ({ children, onClose }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-md shadow-md relative">
                {children}
                <button
                    className="absolute top-0 right-0 p-2"
                    onClick={onClose}
                >
                    &times;
                </button>
            </div>
        </div>
    );
};

export default Model;
