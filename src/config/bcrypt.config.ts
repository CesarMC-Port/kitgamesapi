import bcrypt from "bcrypt"

export const bcryptPassword = (pw:any) => {
const salt = bcrypt.genSaltSync();
const hash = bcrypt.hashSync(pw, salt);

return hash;
};

export const comparePassword = (pw:any, hash:any) => bcrypt.compareSync(pw, hash);