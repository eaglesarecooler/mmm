import "dreamland";
import "./styles.css";
import { Main } from "./main";
import { Splash } from "./splash";
import { hasContent } from "./fs";

const initialHasContent = await hasContent();

const App: Component<
	{},
	{
		el: HTMLElement;
		showInstructions: boolean;
	}
> = function () {
	this.css = `
		position: relative;

		div {
			position: absolute;
			width: 100%;
			height: 100%;
			top: 0;
			left: 0;
		}
		#splash {
			z-index: 1;
		}

		@keyframes fadeout {
			from { opacity: 1; scale: 1; }
			to { opacity: 0; scale: 1.2; }
		}
	`;

	let main = <Main />;
	const start = () => main.$.start();
	const next = () => {
		this.el.addEventListener("animationend", this.el.remove);
		this.el.style.animation = "fadeout 0.5s ease";
		start();
	};

	this.mount = () => {
		if (initialHasContent) start();
	};

	return (
		<div id="app" class={"dark"}>
			{initialHasContent ? null : (
				<div id="splash" bind:this={use(this.el)}>
					<Splash on:next={next} start={start} />
				</div>
			)}
			<div id="main">{main}</div>
		</div>
	);
};

const root = document.getElementById("app")!;
try {
	root.replaceWith(<App />);
} catch (err) {
	console.log(err);
	root.replaceWith(document.createTextNode(`Failed to load: ${err}`));
}
