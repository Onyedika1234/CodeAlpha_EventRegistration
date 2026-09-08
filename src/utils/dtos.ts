interface SignUp {
  name: string;
  email: string;
  password: string;
  role: string;
}

interface Login {
  email: string;
  password: string;
}

export const signUpDto = (body: any): SignUp => {
  return {
    name: body.name,
    email: body.email,
    password: body.password,
    role: body.role,
  };
};

export const loginDto = (body: any): Login => {
  return {
    email: body.email,
    password: body.password,
  };
};
