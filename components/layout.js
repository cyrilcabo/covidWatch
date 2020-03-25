import ThemeProvider from '@material-ui/styles/ThemeProvider';
import {createMuiTheme} from '@material-ui/core/styles';
import Head from 'next/head';
import NavBar from './navbar';

const theme = createMuiTheme();

const Layout = (props) => {
	return (
		<div>
			<Head>
				<title> CovidWatch </title>
			</Head>
			<ThemeProvider theme={theme}>
				<NavBar />
				{props.children}
			</ThemeProvider>
		</div>
	);
}

export default Layout;