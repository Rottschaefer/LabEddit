import { useEffect, useState } from "react"
import { Header } from "../../Components/Header/Header"
import { useRequestData } from "../../Hooks/UseRequestData"
import { Post } from "../../Components/Post/Post"
import { StyledFeedPage } from "./StyledFeedPage"

export const FeedPage = () => {

    const path = "http://localhost:3003/posts"
    const {getPosts} = useRequestData(path)

    const [fade, setFade] = useState(false)

    useEffect(() => {
        setFade(true)
    }, [])


    const [posts, setPosts] = useState([])

    useEffect(()=>{
        getPosts(setPosts)
    },[])

    return(
        <StyledFeedPage fade={fade}>
        <Header text="Logout"/>
        {posts.map((post)=>{return <Post name={post.creator.name} content={post.content} likes={post.likes}/>})} 
        </StyledFeedPage>
    )
}