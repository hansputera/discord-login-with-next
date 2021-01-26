import {
	Button, Text, Link as ChakraLink
} from "@chakra-ui/react";
import Head from "next/head";
import { Main } from "../components/Main";
import { Container } from "../components/Container";
import { Footer } from "../components/Footer";
import { Hero } from "../components/Hero";
import { DarkModeSwitch } from "../components/DarkModeSwitch";
import revoke from "../managers/revoke";
import { withSession } from "next-session";

const Logout = ({ logged, successLogout }) => {
	return (
		<Container height="100vh">
			<Head>
				<title>Discord Logout</title>
			</Head>
			<Hero title={ successLogout ? "Logout" : "Fail" } />
			<Main>
				<Text>{ logged === !1 ? "Fail, you must login first!" : (successLogout ? "Successfuly logout" : "Fail, revoking token failed. Try again!") }</Text>
				<Button variant="solid">
					<ChakraLink href={logged === !1 ? "/" : (successLogout ? "/" : "/logout/")}>
						{ logged === !1 ? "Go back" : (successLogout ? "Success logout, go back" : "Revoking token fail, click for reload")}</ChakraLink>
				</Button>
			</Main>
			<DarkModeSwitch />
			<Footer>
				<Text>Next ❤️ Chakra</Text>
			</Footer>
		</Container>
	);
}

Logout.getInitialProps = async ({ req }) => {
	if (req.session['access_token']) {
		const revoked = await revoke(req.session['access_token']);
		if (!revoked) {
			return { logged: true, successLogout: false };
		} else {
			req.session.destroy();
			return { logged: true, successLogout: true };
		}
	} else return { logged: false, successLogout: false };
}


export default withSession(Logout);