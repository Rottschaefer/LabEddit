import { BrowserRouter, Routes, Route } from "react-router-dom"
import { SignUpPage } from "../Pages/SignUpPage/SignUpPage"
import { FeedPage } from "../Pages/FeedPage/FeedPage"
import { LoginPage } from "../Pages/LoginPage/LoginPage"
import GlobalStyle from "../globalStyles"

export const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route index element={<LoginPage />} />
                <Route path="signup" element={<SignUpPage />} />
                <Route path="feed" element={<FeedPage />} />
                {/* <Route path="feed/:id" element={<LoginPage/>}/> */}
            </Routes>
        </BrowserRouter>
    )
}