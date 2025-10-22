<script lang="ts">
    let nightMode = true;

    const bgColors = ['bg-gray-300', 'bg-gray-800'];
    const textColors = ['text-gray-800', 'text-white'];
    const borderColors = ['border-gray-800', 'border-gray-500'];
    const hoverColors = ['hover:bg-gray-200', 'hover:bg-gray-700'];

    $: bgColor = nightMode ? bgColors[1] : bgColors[0];
    $: textColor = nightMode ? textColors[1] : textColors[0];
    $: borderColor = nightMode ? borderColors[1] : borderColors[0];
    $: hoverColor = nightMode ? hoverColors[1] : hoverColors[0];
    $: nightModeIcon = nightMode ? 'moonClipart.png' : 'sunClipart.png';

    function toggleNightMode() {
        nightMode = !nightMode;
    }

    function downloadResume() {
        const link = document.createElement('a');
        link.href = 'resume.pdf';
        link.download = 'resume.pdf';
        link.click();
    }

    async function handleSubmit(event: SubmitEvent) {
        event.preventDefault();
        const form = event.target as HTMLFormElement;
        const data = new FormData(form);

        const response = await fetch(form.action, {
            method: form.method,
            body: data,
            headers: { 'Accept': 'application/json' }
        });

        if (response.ok) {
            alert('✅ Thank you, your message has been sent!');
            form.reset();
        } else {
            alert('❌ Something went wrong. Please try again.');
        }
    }
</script>

<div class="min-h-screen {bgColor} p-8 {textColor}">
    <h1 class="text-6xl font-extrabold">Boden Harris</h1>
    <button 
        class="absolute w-16 h-16 top-4 right-4 flex items-center justify-center rounded-full {bgColor} {hoverColor} focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        aria-label="Toggle Night Mode"
        on:click={toggleNightMode}>
        <img src={nightModeIcon} alt="Moon Icon" class="w-[48px] h-[48px]" style="{nightMode ? 'filter: invert(1)' : ''}">
    </button>
    <hr class="border-t-2 {borderColor}">
    <h2 class="text-lg ">blharris@umass.edu</h2>

    <!-- Responsive layout: stacks on mobile, side-by-side on large screens -->
    <div class="flex flex-col lg:flex-row items-start lg:space-x-8">
        <!-- Left Column -->
        <div class="flex-1">
            <p class="mt-4 border {borderColor} rounded-lg w-full lg:w-3/4 h-auto p-3">
                <b class="font-bold text-2xl">About me: </b><br>
                I am a sophomore at the UMass Amherst Commonwealth Honors College studying Computer Science.<br>
                I am scheduled to graduate the spring of 2028.
            </p>

            <p class="mt-4 border {borderColor} rounded-lg w-full lg:w-3/4 h-auto p-3 flex items-center justify-between">
                <span class="flex-1 text-center font-bold text-blue-500 text-lg">
                    <a href="resume.pdf" target="_blank" class="hover:text-blue-600">
                        View My Resume
                    </a>
                </span>
                <button 
                    class="w-12 h-12 flex items-center justify-center rounded-full {bgColor} {hoverColor} focus:outline-none focus:ring-2 focus:ring-blue-500"
                    aria-label="Download Resume"
                    on:click={downloadResume}>
                    <img src="downloadIcon.png" alt="Download Icon" class="w-[32px] h-[32px]" style="{nightMode ? 'filter: invert(1)' : ''}">
                </button>
            </p>

            <div class="mt-4 border {borderColor} rounded-lg w-full lg:w-3/4 h-auto p-3">
                <b class="font-bold text-2xl">Skills: </b><br>
                <ul class="list-disc list-inside">
                    <li>Java</li>
                    <li>C</li>
                    <li>Python</li>
                    <li>Svelte</li>
                    <li>HTML</li>
                    <li>CSS</li>
                    <li>JavaScript</li>
                </ul>
            </div>

            <div class="mt-4 border {borderColor} rounded-lg w-full lg:w-3/4 h-auto p-3">
                <b class="font-bold text-2xl">Projects:</b><br>
                <ul class="list-disc pl-6 mt-2">
                    <li>
                        <a href="https://github.com/bodenharris/Chess-Engine-Unity" target="_blank" class="text-blue-600 hover:underline">
                            Chess Engine
                        </a> – A chess engine in C# capable of board evaluation, move generation, and move selection. 
                    </li>
                    <li>
                        <a href="https://github.com/bodenharris/Assembly-Interpreter" target="_blank" class="text-blue-600 hover:underline">
                            Assembly Interpreter
                        </a> – A simulation of an assembly interpreter in C capable of reading external files and executing assembly instructions. 
                    </li>
                    <li>
                        <a href="https://github.com/bodenharris/Goonbox-game" target="_blank" class="text-blue-600 hover:underline">
                            Online Multiplayer Game
                        </a> – A multiplayer game inspired by Jackbox, featuring real-time interactions between a host and connected players. 
                    </li>
                </ul>
            </div>
        </div>

        <!-- Right Column -->
        <div class="flex justify-end mt-8 lg:mt-4 flex-col items-center space-y-6">
            <!-- Profile Picture -->
            <img src="profile.jpg" alt="Profile" class="h-96 w-96 rounded-full ring-6 ring-gray-500">

            <!-- Connect with Me Box -->
            <div class="mt-6 border {borderColor} rounded-2xl p-6 w-96 text-center {bgColor} shadow-lg">
                <h3 class="text-2xl font-bold mb-4">Connect with Me</h3>
                <div class="flex justify-center space-x-6 mb-4">
                    <a href="https://github.com/bodenharris" target="_blank" class="transition transform hover:scale-110">
                        <img src="github.png" alt="GitHub" class="w-10 h-10" style="{nightMode ? 'filter: invert(1)' : ''}">
                    </a>
                    <a href="https://www.linkedin.com/in/boden-harris-a74897326/" target="_blank" class="transition transform hover:scale-110">
                        <img src="linkedin.png" alt="LinkedIn" class="w-10 h-10" style="{nightMode ? 'filter: invert(1)' : ''}">
                    </a>
                    <a href="https://www.instagram.com/bodenharris523/" target="_blank" class="transition transform hover:scale-110">
                        <img src="instagram.png" alt="Instagram" class="w-10 h-10" style="{nightMode ? 'filter: invert(1)' : ''}">
                    </a>
                    <a href="https://discord.com/users/1276287236106883177" target="_blank" class="transition transform hover:scale-110">
                        <img src="discord.png" alt="Discord" class="w-10 h-10" style="{nightMode ? 'filter: invert(1)' : ''}">
                    </a>
                </div>

                <form
                    on:submit={handleSubmit}
                    action="https://formspree.io/f/mldpwzlr"
                    method="POST"
                    class="flex flex-col space-y-3"
                >
                    <input
                        type="email"
                        name="email"
                        placeholder="Your email address"
                        class="p-2 rounded-md border {borderColor} focus:ring-2 focus:ring-blue-500 {textColor} {bgColor}"
                        required
                    />
                    <textarea
                        name="message"
                        placeholder="Your message..."
                        class="p-2 rounded-md border {borderColor} focus:ring-2 focus:ring-blue-500 {textColor} {bgColor}"
                        rows="3"
                        required
                    ></textarea>
                    <button
                        type="submit"
                        class="rounded-md py-2 {bgColor} {hoverColor} border {borderColor} font-semibold transition focus:ring-2 focus:ring-blue-500"
                    >
                        Send
                    </button>
                </form>
            </div>
        </div>
    </div>
</div>
