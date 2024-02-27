import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"


const UnLoginned = () => {
  return (
    <>
    <ul className="list-none flex gap-x-8 items-center ">
    <Link to={"/auth/login"} className="cursor-pointer max-sm:hidden font-normal" >
      Login
      </Link>
  <Link to={"/auth/register"}>
<Button variant={"default"} className="bg-[var(--secondary)] rounded-lg hover:bg-[var(--secondary)] active:scale-95 transition-transform">
Get started
</Button>
  </Link>

</ul>
    </>
  )
}

export default UnLoginned