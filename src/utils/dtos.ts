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

interface Event {
  title: string;
  description: string;
  capacity: string;
  location: string;
  date: string;
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

export const eventDto = (body: any): Event => {
  return {
    title: body.title,
    description: body.description,
    capacity: body.capacity,
    location: body.location,
    date: body.date,
  };
};
