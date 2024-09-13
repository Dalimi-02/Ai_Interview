export default function HowItWorks() {
    return (
      <div style={{ padding: '2rem' }}>
        <h1>How It Works</h1>
        <p>
          Welcome to the AI Mock Interview Application! Here’s how you can get started:
        </p>
        <ol style={{ lineHeight: '1.8' }}>
          <li><strong>Go to the Dashboard:</strong> From the homepage, navigate to the dashboard.</li>
          <li><strong>Add a New Interview:</strong> Click on the “Add New” button to start a new mock interview.</li>
          <li><strong>Fill Out the Details:</strong> You will need to provide the following information:
            <ul>
              <li><strong>Job Role or Position:</strong> The role you're applying for.</li>
              <li><strong>Job Description:</strong> A short description of the position.</li>
              <li><strong>Years of Experience:</strong> Your professional experience related to the role.</li>
            </ul>
          </li>
          <li><strong>Generate Mock Interview:</strong> After filling out the details, the system will generate a set of interview questions tailored to the role and experience you provided.</li>
          <li><strong>Answer Questions:</strong> Respond to each interview question as you would in a real interview.</li>
          <li><strong>Receive Feedback:</strong> At the end of the interview, the system will provide feedback for each question to help you improve.</li>
        </ol>
        <p>
          Get started today and prepare for your next job interview with confidence!
        </p>
      </div>
    );
  }
  