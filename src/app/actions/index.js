export const CHANGE_OPTIONS = "CHANGE_OPTIONS";
export const CHANGE_USER_OPTIONS = "CHANGE_USER_OPTIONS";

export const changeCheckbox = (name, value) => ({
	type: CHANGE_OPTIONS,
	name,
	value
});

export const changeUserConfigure = value => ({
	type: CHANGE_USER_OPTIONS,
	value
});
