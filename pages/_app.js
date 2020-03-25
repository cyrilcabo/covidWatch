import App from 'next/app';
import {Provider} from 'react-redux';
import withRedux from 'next-redux-wrapper';
import makeStore from '../redux/reducers/reducers';

const CovidWatch = ({Component, pageProps, store, custom}) => {
	return (
		<Provider store={store} >
			<Component {...pageProps} />
		</Provider>
	);
}

CovidWatch.getInitialProps = async ({Component, ctx}) => {
	const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {};
	return {pageProps: pageProps};
}




export default withRedux(makeStore)(CovidWatch);