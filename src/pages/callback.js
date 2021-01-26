import { withSession } from "next-session";
import callbackManager from "../managers/callback";
import {
	Button,
	Text
} from "@chakra-ui/react";
import { Hero } from '../components/Hero'
import { Main } from "../components/Main"
import { Container } from '../components/Container'
import { DarkModeSwitch } from '../components/DarkModeSwitch'
import { Footer } from '../components/Footer'

function callback({ success }) {
	if (!success) return (
		<Container height="100vh">
			<Hero title="Failed" />
			<Main>
				<Button variant="solid" onClick={() => window.location.replace('/')}>Go back</Button>
			</Main>
			<DarkModeSwitch />
			<Footer>
				<Text>Next ❤️ Chakra</Text>
			</Footer>
		</Container>
	);
	else {
		return (
			<Container height="100vh">
				<Hero title="Success" />
				<Main>
					<Button variant="solid" onClick={() => window.location.replace('/')}>Go back</Button>
				</Main>
				<DarkModeSwitch />
				<Footer>
					<Text>Next ❤️ Chakra</Text>
				</Footer>
			</Container>
		);
	}
}

callback.getInitialProps = async ({ req, query }) => {
	const { code } = query;

	if (!code) return { success: false };
	const callback_res = await callbackManager(code);
	if (!callback_res) return { success: false };
	req.session['access_token'] = callback_res['access_token'];
	return { success: true };
}


export default withSession(callback);