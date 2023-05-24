
export const goToSignUpPage = (navigate) => {
    navigate('/signup')
}

export const goToLogInPage = (navigate) => {
    navigate('/')
}

export const goToFeedPage = (navigate) => {
    navigate('/feed')
}

export const goToCommentsPage = (navigate, id) => {
    navigate(`/feed/${id}`)
}