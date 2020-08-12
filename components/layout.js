import ThemeProvider from '@material-ui/styles/ThemeProvider';
import {createMuiTheme} from '@material-ui/core/styles';
import Head from 'next/head';

import NavBar from './navbar';
import Footer from './Footer/footer';

const theme = createMuiTheme();

const Layout = (props) => {
	const navs = [{name: "Home", link: "/"}, {name: "Announcements", link: "/announcements"}, {name: "About", link: "/about"}, {name: "Admin", link: "/admin/overview"}];

	return (
		<div>
			<Head>
				<title> CovidWatch </title>
			    <meta name="viewport" content="width=device-width, user-scalable=no" />
			</Head>
			<ThemeProvider theme={theme}>
				{ (props.navbar) ?props.navbar :<NavBar navs={navs} /> }
				{props.children}
				{ props.noFooter ?"" :<Footer navs={navs} /> }
			</ThemeProvider>
			<style jsx global>{`
				body {
					margin: 0;
				}
				html {
					scroll-behavior: smooth;
				}
			`}</style>
		</div>
	);
}

export default Layout;
