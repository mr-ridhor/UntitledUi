interface UserProfile {
  id: number;
  email: string;
  username: string;
  first_name: string;
  last_name: string;
  password: string;
  createdAt: string;
  updatedAt: string;
  profile: {
    id: number;
    userId: number;
    verificationCode: string;
    status: boolean;
    createdAt: string;
    updatedAt: string;
  };
}

export interface AuthResponse {
  user: UserProfile;
  token: string;
  code?:string
}

// Example usage:
// const exampleResponse: AuthResponse = {
//   user: {
//     id: 1,
//     email: "coolchat@cloudtemail.com",
//     username: "cool_chat",
//     first_name: "cool",
//     last_name: "chat",
//     password: "$2a$10$yAGy6TNl6HNaIeyXDraBh.UNNAFQlEs6m1LdIUTBr3YsTKCDnx2Da",
//     createdAt: "2024-01-27T12:33:33.894Z",
//     updatedAt: "2024-01-27T12:33:33.894Z",
//     profile: {
//       id: 1,
//       userId: 1,
//       verificationCode: "005752",
//       status: true,
//       createdAt: "2024-01-27T12:33:33.894Z",
//       updatedAt: "2024-01-27T12:36:41.248Z",
//     },
//   },
//   token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTcwNjM1OTExNywiZXhwIjoxNzA4OTUxMTE3fQ.t__6UihHoeJ0M1glzQ1WgflYkXNptpO9EPAFpK6BBYY",
// };
