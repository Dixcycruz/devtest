import Banner from '../components/Banner';
import Featured from '../components/Highlights';

export default function Home(){

	const data = {
		title: "Dev Test Netzwelt",
		content: "Welcome!",
		destination: "/login",
		label: "Log In!"
	}

	return(
		<>
			<Banner bannerProp={data}/>
			<Featured/>
		</>
	)
}