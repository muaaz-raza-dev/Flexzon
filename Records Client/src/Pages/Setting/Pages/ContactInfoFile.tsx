import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"

const ContactInfoFile = () => {
  return (
    <div className=" w-full py-12 flex justify-center ">
        <div className="md:w-[90%] flex flex-col gap-y-8">

      <h1 className="text-3xl hFont"> Edit Profile</h1>
      <section className="">
  
      </section>

      <section className="flex gap-x-4 flex-col ">
        <label htmlFor="email" className="hFont text-xl py-2" >Username </label>
        <div className="md:w-[80%]  flex  flex-col gap-y0.5 justify-center">
<Input type="text" id="email" className=" focus-visible:ring-0 focus-visible:border-black border" name="username" placeholder="username" />
        </div>
      </section>

      <section className="flex gap-x-4 flex-col ">
        <label htmlFor="email" className="hFont text-xl py-2" >Email</label>
        <div className="md:w-[80%]  flex  flex-col gap-y0.5 justify-center">
<Input type="email" id="email" className=" focus-visible:ring-0 focus-visible:border-black border" name="email" placeholder="Email" />
  <p className="text-xs  text-gray-500 tracking-tighter">This won't visible on your profile</p>
        </div>
      </section>
{/* //! Bio */}
      <section className="flex gap-x-4 flex-col ">
        <label htmlFor="email"  className="hFont text-xl py-2" >About</label>
        <div className="md:w-[80%]  flex  flex-col gap-y0.5 justify-center">
<Textarea placeholder="write about you" name="bio" className=" focus-visible:ring-0 focus-visible:border-black border" />
        </div>
      </section>
      <Button className="w-[20%]  text-md  bg-[var(--secondary)] hover:bg-[var(--primary)] hover:text-white text-white" variant={"outline"} >
        Save
  </Button>
  <Separator/>
        <div className="border text-start max-md:flex-col p-2 gap-y-2 md:items-center flex justify-between">
            <div className="flex flex-col gap-y-1">

        </div>
        </div>
        </div>
    </div>
  )
}

export default ContactInfoFile
