import { type NextPage } from "next";
import Image from "next/image";
import Footer from "../components/layout/Footer";
import Card from "../components/index/Card";
import YoutubeEmbed from "../components/index/YoutubeEmbed";
import Login from "../components/index/Login";
import Logo from "../components/Logo";
import Link from "next/link";

const Home: NextPage = () => {
  return (
    <>
      <main className="relative min-h-screen">
        <div className="flex min-h-screen flex-col">
          <div className="absolute top-2 left-2 m-1 hidden md:flex">
            <Logo />
          </div>
          <div className="flex flex-col-reverse items-center md:flex-row">
            <div className="flex flex-col items-center gap-7 p-3 md:w-1/2 ">
              <div>
                <h1 className="mb-5 text-center text-3xl font-bold md:text-4xl">
                  Enrich your
                  <span className="text-primary"> teaching </span>
                  experience
                </h1>
                <p className="max-w-2xl text-center text-lg">
                  Lesson Maestro is a tool used by music teachers to manage
                  their lessons, students, and music. Check out the demo below
                  to see what Lesson Maestro can do for you!
                </p>
              </div>
              <Login />
            </div>
            <div className="relative h-screen max-h-[300px] w-full md:m-0 md:max-h-[800px] md:w-1/2 ">
              <Image
                src={"/images/landing-bg.jpg"}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="rounded-bl object-cover"
                alt="Lots of guitars, a Keyboard, and a mic in a room"
                priority={true}
              />
            </div>
          </div>
          <div className="bg-gradient-to-t from-emerald-400 to-white">
            <div className=" px-5 py-10 md:py-20">
              <div className="flex flex-col items-center gap-5 lg:flex-row lg:justify-evenly">
                <Card
                  src="/images/organize.jpg"
                  alt="Keyboard, paper, and writing utensils"
                  title="Organize"
                  text="Quickly view student information, current repertoire, and manage your
                  tasks."
                />
                <Card
                  src="/images/teach.jpg"
                  alt="Young person being taught guitar"
                  title="Teach"
                  text="Save time so you can spend more time teaching your students!"
                />
                <Card
                  src={"/images/manage.jpg"}
                  alt="Woman and child learning piano"
                  title="Manage"
                  text="Keep track of your lesson times so you know what to expect for the
                  day."
                />
              </div>
            </div>
            <div className="py-20 px-2">
              <YoutubeEmbed embedId={"WXCoNu3Z1Q8"} />
            </div>
            <div className="flex justify-center pb-20">
              <Link href={"/sign-up"} className="btn-secondary btn-lg btn">
                Get Started
              </Link>
            </div>
          </div>
          <Footer />
        </div>
      </main>
    </>
  );
};

export default Home;
