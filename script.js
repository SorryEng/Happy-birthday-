class BirthdayProgram {
    constructor() {
        this.output = document.getElementById('output');
        this.userInput = document.getElementById('userInput');
        this.inputContainer = document.getElementById('inputContainer');
        this.firstName = "gims";
        this.lastName = "alba";
        this.age = -1;
        this.isWaitingForInput = false;
        this.currentInputType = 'name';
        
        this.init();
    }

    async init() {
        await this.showBootSequence();
        await this.startNameCheck();
    }

    async slowPrint(text, delay = 30) {
        for (let char of text) {
            this.output.innerHTML += char;
            await this.sleep(delay);
        }
    }

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async showBootSequence() {
        await this.slowPrint("==================== BOOT SEQUENCE START ====================\n\n");
        await this.sleep(300);
    }

    async startNameCheck() {
        this.isWaitingForInput = true;
        this.currentInputType = 'name';
        await this.slowPrint("Enter your name to continue: ");
        this.setupInputListener();
    }

    setupInputListener() {
        this.userInput.focus();
        
        this.userInput.onkeypress = async (e) => {
            if (e.key === 'Enter') {
                const input = this.userInput.value.trim();
                this.userInput.value = '';
                
                this.output.innerHTML += input + '\n';
                
                if (this.isWaitingForInput) {
                    this.isWaitingForInput = false;
                    
                    if (this.currentInputType === 'name') {
                        await this.processName(input);
                    } else if (this.currentInputType === 'age') {
                        await this.processAge(input);
                    }
                }
            }
        };
    }

    async processName(input) {
        const lowerName = input.toLowerCase();
        
        if (lowerName.includes(this.firstName) || lowerName.includes(this.lastName)) {
            await this.slowPrint("\n<span class='success'>Access Granted.</span>\n\n");
            await this.sleep(300);
            await this.slowPrint("Initializing system modules...\n");
            await this.sleep(300);
            await this.showLoadingBar();
            await this.askForAge();
        } else {
            await this.slowPrint("<span class='error'>Sorry, this is not for you.</span>\n\n", 30);
            await this.sleep(1000);
            await this.startNameCheck();
        }
    }

    async showLoadingBar() {
        await this.slowPrint("Loading birthday engine: ");
        this.output.innerHTML += '\n';
        
        const total = 25;
        for (let i = 0; i <= total; i++) {
            const percent = Math.floor((100 * i) / total);
            const bars = '#'.repeat(i);
            const spaces = ' '.repeat(total - i);
            
            // Update loading bar line
            const lines = this.output.innerHTML.split('\n');
            lines[lines.length - 1] = `[${bars}${spaces}] ${percent}%`;
            this.output.innerHTML = lines.join('\n');
            
            await this.sleep(90);
        }
        this.output.innerHTML += '\n\n';
    }

    async askForAge() {
        this.isWaitingForInput = true;
        this.currentInputType = 'age';
        await this.slowPrint("Before we continue, pila imong edad karon? ");
        this.setupInputListener();
    }

    async processAge(input) {
        const age = parseInt(input.trim());
        
        if (!isNaN(age) && age > 0) {
            this.age = age;
            await this.showBirthdayMessage();
        } else {
            await this.slowPrint("<span class='error'>Invalid input. Palihug input og numero.</span>\n\n", 30);
            await this.sleep(1000);
            await this.askForAge();
        }
    }

    async showBirthdayMessage() {
        // Clear screen effect
        this.output.innerHTML = '';
        await this.sleep(300);
        await this.slowPrint("Rendering birthday package...\n\n");
        await this.sleep(500);

        // Show cake and message
        this.showCake();
        await this.sleep(500);
        
        await this.slowPrint("<span class='info'>Bro, happy birthday!</span>\n", 30);
        await this.slowPrint("Unsa may gi-pang buhat nimo diha karon?\n", 30);
        await this.slowPrint("Go lang — welcome ka diri sa CpE bisan dili ka pirmi mag-code.\n", 30);
        await this.slowPrint("Padayon lang ug improve; naa ra mi dinhi pirmi para motabang.\n\n", 30);

        await this.slowPrint(`<span class='warning'>You are now ${this.age} years old — blooming gihapon ka.</span>\n\n`, 30);

        await this.slowPrint("Press Enter to exit...\n", 30);
        
        this.isWaitingForInput = true;
        this.userInput.onkeypress = (e) => {
            if (e.key === 'Enter') {
                this.output.innerHTML += "\n<span class='success'>Thank you for using Birthday Terminal!</span>\n";
                this.inputContainer.classList.add('hidden');
            }
        };
    }

    showCake() {
        const cake = `
           ( )     ( )     ( )
           (*)     (*)     (*)
            |       |       |
         .-''''-. .-''''-. .-''''-.
       .'                           '.
      :   HAPPY BIRTHDAY, Gims Phol B. Alba!   :
       '._                       _.'
          '--.             .--'
              '-----------'
       ,-----------------------------.
       |  [:::::]   [:::::]   [:::::]  |
       |  [:::::]   [:::::]   [:::::]  |
       '-----------------------------'
        `;
        
        this.output.innerHTML += '<div class="cake">' + cake + '</div>';
    }
}

// Start the program when page loads
document.addEventListener('DOMContentLoaded', () => {
    new BirthdayProgram();
});