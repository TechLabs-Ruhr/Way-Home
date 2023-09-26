import AddFriendButton from "@/components/ui/AddFriendButton"
import {FC} from "react"



const Page: FC = ({}) => {
    return (
    <> 
      <main className="pt-8 ml-10">
        <h1 className="font-bold text-5xl mb-8">Connect with fellow travelers</h1>
        <AddFriendButton/>
      </main>
    </>
    )
  }
  
  export default Page
  