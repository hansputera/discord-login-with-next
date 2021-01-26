import {
  Text,
  Button
} from '@chakra-ui/react'
import Head from "next/head";
import { Hero } from '../components/Hero'
import { Container } from '../components/Container'
import { Main } from '../components/Main'
import { DarkModeSwitch } from '../components/DarkModeSwitch'
import { Footer } from '../components/Footer'

// Session
import { withSession } from "next-session";
import User from "../managers/user";

const Index = ({ logged, data }) => (
  <Container height="100vh">
	<Head>
		<title>Discord Login with NextJS</title>
	</Head>
	<Hero title="Welcome" />
    <Main>
		<Text>{ logged ? `Hello ${data['username']}#${data['discriminator']}!` : ""}</Text>
	  <Button variant="solid" onClick={() => logged ? window.location.replace("/logout") : window.location.replace("/login")}>{logged ? "Logout" : "Login"}</Button>
    </Main>

    <DarkModeSwitch />
    <Footer>
      <Text>Next ❤️ Chakra</Text>
    </Footer>
  </Container>
)

Index.getInitialProps = async ({ req }) => {
	if (!req.session['access_token']) {
		return { logged: false, data: undefined }
	} else {
		const user = await User(req.session['access_token']);
		return { logged: true, data: user };
	}
}

export default withSession(Index)