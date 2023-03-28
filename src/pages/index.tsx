import { type NextPage } from "next";
import Image from "next/image";
import Footer from "../components/layout/Footer";
import Card from "../components/index/Card";
import YoutubeEmbed from "../components/index/YoutubeEmbed";
import Login from "../components/index/Login";
import Logo from "../components/Logo";

const Home: NextPage = () => {
  return (
    <>
      <main className="min-h-screen">
        <div>
          <div className="flex min-h-screen flex-col">
            <div className="absolute m-1">
              <Logo />
            </div>
            <div className="flex flex-col-reverse items-center border-b border-base-300 md:flex-row md:p-0">
              <div className="flex flex-col items-center gap-5 p-3 md:w-1/2 ">
                <div>
                  <h1 className="mb-5 text-center text-3xl font-bold md:text-4xl">
                    Enrich your
                    <span className="text-primary"> teaching </span>
                    experience
                  </h1>
                  <p className="max-w-2xl text-center text-lg">
                    My Music Studio is a tool used by music teachers to manage
                    their students and their studio. Check out the demo to see
                    what My Music Studio can do for you!
                  </p>
                </div>
                <Login />
              </div>
              <div className="relative h-screen max-h-[300px] w-full md:m-0 md:max-h-[800px] md:w-1/2 ">
                <Image
                  src="/assets/images/landing-bg.jpg"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                  alt="Lots of guitars, a Keyboard, and a mic in a room"
                />
              </div>
            </div>
            <div className="bg-secondary-light px-5 py-10 md:py-20">
              <div className="flex flex-col items-center gap-5 md:flex-row md:justify-evenly">
                <Card
                  src="/assets/images/organize.jpg"
                  alt="Keyboard, paper, and writing utensils"
                  title="Organize"
                  text="Quickly view student information, current repertoire, and manage your
                  tasks."
                />
                <Card
                  src="/assets/images/teach.jpg"
                  alt="Young person being taught guitar"
                  title="Teach"
                  text="Save time so you can spend more time teaching your students!"
                />
                <Card
                  src={"/assets/images/manage.jpg"}
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
            <Footer />
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
