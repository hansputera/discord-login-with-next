import { useRouter } from "next/router";
import {
	Button, Text, Link as ChakraLink
} from "@chakra-ui/react";
import Head from "next/head";
import { Main } from "../components/Main";
import { DarkModeSwitch } from "../components/DarkModeSwitch";
import { Hero } from "../components/Hero";
import { Footer } from "../components/Footer";
import { Container } from "../components/Container";
import { withSession } from "next-session";
import User from "../managers/user";

const authorizeURL = "https://discord.com/api/oauth2/authorize?client_id=801699906221768744&redirect_uri=https%3A%2F%2Fdiscord-login-with-next.hansputera.repl.co%2Fcallback&response_type=code&scope=identify";


function Login({ logged, user }) {
	const router = useRouter();
	return (
		<Container height="100vh">
			<Head>
				<title>Discord Login | {router.pathname}</title>
			</Head>
			<Hero title={logged ? "Already logged" : "Login" } />
			<Main>
				<Text>{ logged ? `Hello ${user['username']}#${user['discriminator']}, how about you? Please click the button!` : "Click the button!"}</Text>
				<Button variant="solid">
					<ChakraLink href={logged ? "/" : authorizeURL}>{logged ? "Go back" : "Click here to login"}</ChakraLink>
				</Button>
			</Main>
			<DarkModeSwitch />
			<Footer>
				<Text>Next ❤️ Chakra</Text>
			</Footer>
		</Container>
	);
}

Login.getInitialProps = async ({ req }) => {
	if (req.session['access_token']) {
		var user = await User(req.session['access_token']);
		return { logged: true, user };
	} else return { logged: false };
}

export default withSession(Login);