class CustomError extends Error{
    constructor(message , status = 500){
        super(message);  //calls the constructor of the parent class.
        this.status=status;
        this.message=message;
    }
}

module.exports=CustomError;