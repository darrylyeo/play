{

const currentScript = document.currentScript

document.addEventListener('DOMContentLoaded', () => {
	const title = currentScript.dataset.title || document.title
	document.title += ' | Play | Darryl Yeo'

	const postLink = currentScript.dataset.link || location.href.replace('//play', '//').replace('/$', '')

	const style = document.createElement('style')
	style.textContent = `
		@font-face {
			font-family: system;
			font-style: normal;
			font-weight: 300;
			src: local(".SFNSText-Light"), local("Segoe UI Light"), local("Roboto-Light"), local(".HelveticaNeueDeskInterface-Light"), local("Ubuntu Light"), local("DroidSans");
		}
		dy-play-frame {
			/*background: radial-gradient(circle at left, rgba(103, 183, 225, 0.5), rgba(255, 184, 78, 0.5));*/
			background-color: rgba(247, 247, 247, 0.25);
			background: radial-gradient(
				ellipse farthest-corner at center 50vh,
				transparent 70%,
				rgba(247, 247, 247, 0.25)
			);
			box-sizing: border-box;
			display: flex;
			justify-content: space-between;
			align-items: center;
			position: fixed;
			width: 100%;
			padding: 0.8em;
			left: 0;
			top: 0;

			font-family: Asap, Avenir, system, Helvetica;
			font-size: 12px;
			line-height: 1.2;

			pointer-events: none;

			color: rgba(0, 0, 0, 0.75);
			/*text-shadow: rgba(255, 255, 255, 0.5) 1px 1px 1px;
			mix-blend-mode: multiply;

			color: #000;
			mix-blend-mode: overlay;*/

		}
		dy-play-frame h1 {
			font-family: 'Slabo 13px', Asap, Avenir, system, Helvetica;
			font-size: 1.2em;
			font-weight: normal;
			margin: 0;
		}
		dy-play-frame h1 span {
			display: inline-block;
			font-size: 0.8em;
		}

		dy-play-frame a {
			border-radius: 4px;
			margin: -0.2em;
			padding: 0.3em 0.5em;

			background-color: rgba(255, 255, 255, 0.25);
			color: rgba(0, 0, 0, 0.7);
			text-align: center;
			text-decoration: none;
			transition: 0.3s;

			pointer-events: initial;
		}
		dy-play-frame a:hover {
			background-color: #67b7e1;
			color: #fff;
			opacity: 0.9;
		}
	`
	document.head.appendChild(style)

	const frame = document.createElement('dy-play-frame')
	Object.assign(frame.style, )
	frame.innerHTML = `
		<h1><strong>${title}</strong> <span>by Darryl Yeo</span></h1>
		<a href="${postLink}" target="_blank">View Post</a>
	`
	document.body.appendChild(frame)
})

}