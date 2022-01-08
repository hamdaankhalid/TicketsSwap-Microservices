const LandingPage = ({ currentUser })  => {
    return <h1>Landing Page</h1>
}

LandingPage.getInitialProps = async () => {
    try {
        const response = await axios.get('/api/users/currentuser');
        return response.data;
    } catch(err) {
        console.log("FUCK")
    }

};

export default LandingPages;