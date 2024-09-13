// export async function signup(state: FormState, formData: FormData) {
//   // Previous steps:
//   // 1. Validate form fields
//   // 2. Prepare data for insertion into database
//   // 3. Insert the user into the database or call an Library API

//   // Current steps:
//   // 4. Create user session
//   await createSession(user.id);
//   // 5. Redirect user
//   redirect("/profile");
// }

// export const createSession = async  ()=>{
//     const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
//     const session = await publicEncrypt({ userId, expiresAt })

//     cookies().set('session', session, {
//       httpOnly: true,
//       secure: true,
//       expires: expiresAt,
//       sameSite: 'lax',
//       path: '/',
//     })
// }
// export const checkUser = async ()=>{
//     const session = cookies().get('session')?.value;
//     const payload = await decrypt(session)

// }
