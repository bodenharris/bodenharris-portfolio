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
        link.href = 'Boden Harris - Resume.pdf';
        link.download = 'Boden Harris - Resume.pdf';
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
    <div class="flex flex-row items-start">
        <div class="flex-1">
            <p class=" mt-4 border {borderColor} rounded-lg w-1/2 h-auto p-3" >
                <b class="font-bold text-2xl">About me: </b><br>
                I am a freshman at the UMass Amherst Commonwealth Honors College studying Computer science.<br>I am currently on track to graduate in the winter of 2026. 
            </p>
            <p class="mt-4 border {borderColor} rounded-lg w-1/2 h-auto p-1 flex items-center space-x-2">
                <a href="Boden Harris - Resume.pdf" class="text-blue-400 inline-block hover:text-blue-600 p-3" target="_blank">
                    View My Resume
                </a> 
                <button 
                class="w-12 h-12 flex items-center justify-center rounded-full {bgColor} {hoverColor} focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label="Download Resume"
                on:click={downloadResume}>
                    <img src="downloadIcon.png" alt="Download Icon" class="w-[32px] h-[32px]" style="{nightMode ? 'filter: invert(1)' : ''}">
                </button>
            </p>
            <div class="mt-4 border {borderColor} rounded-lg w-1/2 h-auto p-3">
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
            <div class="mt-4 border {borderColor} rounded-lg h-auto p-3">
                <b class="font-bold text-2xl">Projects: </b><br>
            </div>
        </div>
        
        <div class="flex justify-end mt-4 flex-col items-center space-y-6">
        <!-- Profile Picture -->
        <img src="profile.jpg" alt="Profile" class="h-96 w-96 rounded-full ring-6 ring-gray-500">

        <!-- Connect with Me Box -->
        <div class="mt-6 border {borderColor} rounded-2xl p-6 w-96 text-center {bgColor} shadow-lg">
            <h3 class="text-2xl font-bold mb-4">Connect with Me</h3>
            <div class="flex justify-center space-x-6 mb-4">
                <!-- GitHub -->
                <a href="https://github.com/bodenharris" target="_blank" class="transition transform hover:scale-110">
                    <img src="github.png" alt="GitHub" class="w-10 h-10" style="{nightMode ? 'filter: invert(1)' : ''}">
                </a>

                <!-- LinkedIn -->
                <a href="https://www.linkedin.com/in/boden-harris-a74897326/" target="_blank" class="transition transform hover:scale-110">
                    <img src="linkedin.png" alt="LinkedIn" class="w-10 h-10" style="{nightMode ? 'filter: invert(1)' : ''}">
                </a>

                <!-- Instagram -->
                <a href="https://www.instagram.com/bodenharris523/" target="_blank" class="transition transform hover:scale-110">
                    <img src="instagram.png" alt="Instagram" class="w-10 h-10" style="{nightMode ? 'filter: invert(1)' : ''}">
                </a>

                <!-- Discord-->
                <a href="https://discord.com/users/1276287236106883177" target="_blank" class="transition transform hover:scale-110">
                    <img src="discord.png" alt="Discord" class="w-10 h-10" style="{nightMode ? 'filter: invert(1)' : ''}">
                </a>
            </div>

            <!-- Email Form -->
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


