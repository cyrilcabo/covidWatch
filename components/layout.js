import ThemeProvider from '@material-ui/styles/ThemeProvider';
import Head from 'next/head';
import NavBar from './navbar';

const Layout = (props) => {
	return (
		<div>
			<Head>
				<title> CovidWatch </title>
			</Head>
			<ThemeProvider>
				<NavBar />
				{props.children}
			</ThemeProvider>
		</div>
	);
}

export default Layout;