import { AnchorIcon } from "../icons"
import { Button } from "../ui/button"

const Headline = () => {
  return (<>
    <div className="bg-primary">
      <div className="py-1 max-w-[50rem] mx-auto flex justify-between items-center">
        <Button><AnchorIcon className="rotate-90" /></Button>
        <p className="text-white">This is announcment bar for displaying all kine of information</p>
        <Button><AnchorIcon className="-rotate-90" /></Button>
      </div>
    </div>
  </>)
}

export default Headline