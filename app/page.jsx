import Restaurant from "./restaurant/page";

export default function Home() {
  process.env.local
  const {usernamee,password}= process.env
  console.log("🚀 ~ Home ~ password:", password)
  console.log("🚀 ~ Home ~ username:", usernamee)
  // console.log("🚀 ~ Home ~ process.env:", process.env)
  return (
    <>
      <Restaurant />
    </>
  );
}
