export const validationEmail = (email) => {
	const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	if (!pattern.test(email)) {
		return false;
	} else {
		return true;
	}
};

export const validationPassword = (password) => {
	const pattern =  /^.*(?=^.{8,20}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/;
	if(!pattern.test(password)){
		return false;
	}else{
		return true;
	}

	
};


export const validationTg = (textTg) => {
	const pattern =  /^\d*(\.?\d*)$/;
	if(!pattern.test(textTg)){
		return false;
	}else{
		return true;
	}

	
};
