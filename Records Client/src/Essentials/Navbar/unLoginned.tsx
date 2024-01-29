import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"


const UnLoginned = () => {
  return (
    <>
    <ul className="list-none flex gap-x-4 max-sm:hidden">
    <Link to={"/auth/login"} className="cursor-pointer font-normal" >
      Login
      </Link>
</ul>
  <Link to={"/auth/register"}>
<Button variant={"default"} className="bg-[var(--secondary)] rounded-lg hover:bg-[var(--secondary)] active:scale-95 transition-transform">
Get started
</Button>
  </Link>

    </>
  )
}

export default UnLoginned