# Accentify

Accentify is an interactive web app created at Hack the Valley 9, designed to help users improve their accent and sound more native. By guiding users through daily practice exercises, Accentify offers personalized feedback based on accent analysis, allowing users to build their skills over time with engaging, structured tasks.

## Why We Created This

Accent bias is a significant issue that is often overlooked in workplaces, where individuals may face discrimination solely based on their accent. This bias can impact career opportunities and create a barrier to effective communication. Recognizing the importance of diversity and the role of artificial intelligence in addressing social issues, we aimed to develop a solution that empowers individuals to overcome accent-related challenges. Accentify was designed to promote inclusivity and support users in developing their communication skills, helping to reduce discrimination based on accent.

## Features

- **Accent Detection**: Users read sentences displayed on the screen, and Accentify analyzes their speech to determine how "native" their accent sounds.
- **Guided Feedback**: If the user's accent is identified as non-native, the app provides a voice recording of a native speaker saying the sentence. Users are encouraged to repeat the sentence until their accent is within the native range.
- **Daily Progress Tracking**: Each day, users receive a new sentence to practice. Accentify also tracks streaks, motivating consistent practice.

## How It Works

1. **Initialize Model**: Accentify uses Teachable Machine's model to recognize and evaluate accents. The app loads a model pre-trained to distinguish between native and non-native accent patterns.
2. **Listen and Analyze**: Users click to start recording, and Accentify listens to their pronunciation. The app compares the accent using the model's labels to determine the nativeness percentage.
3. **Feedback and Task Completion**:
    - If the accent is non-native (above a threshold of 30% foreign), Accentify provides the option to listen to a native speaker's pronunciation.
    - Once the user achieves a more native-sounding pronunciation, their task for the day is complete, and they can return the following day to practice a new sentence.
4. **Progress Visualization**: Users can view their progress percentage and streaks, helping them stay motivated on their journey to improved pronunciation.
