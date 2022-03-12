class HelloWorld {

	constructor() {
		this.message = 'Hello World!';		
	}

	init() {
		console.log(this.message);
	}

}

const helloWorld = new HelloWorld();
helloWorld.init();
