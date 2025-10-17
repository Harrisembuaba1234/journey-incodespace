import React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import harrisAvatar from "./assets/images/harris.jpg";

const Article = () => {
  return (
    <div>
      <div className="article-header">
        <h1>
          My Growth Journey as a Mobile Developer – Building a Time Tracking App
        </h1>
        <div className="article-meta">
          <img
            src={harrisAvatar}
            alt="Harris Avatar"
            style={{ width: "24px", height: "24px", borderRadius: "50%", marginRight: "8px", verticalAlign: "middle" }}
          />
          <span>By Harris</span> | <span>October 6, 2025</span> |{" "}
          <span>7 min read</span>
        </div>
        <img
          src="/assets/images/timetrack.png"
          alt="Time Tracking App UI"
          style={{ width: "100%" }}
        />
      </div>
      <div className="article">
        <p>
          As a budding mobile developer, I've always been fascinated by how apps
          can streamline everyday tasks. Recently, I embarked on a project to
          build a time tracking app using Flutter. This journey wasn't just
          about creating a functional app; it was a deep dive into advanced
          concepts that pushed my skills to new heights. I learned the BLoC
          design pattern for state management, integrated Dio for efficient HTTP
          requests, and focused on writing clean, readable Flutter code. Along
          the way, I faced challenges like setting up an existing project
          codebase, understanding legacy code flows, and decoding JWT tokens for
          authentication. This article shares my experiences, inspired by case
          studies like backend performance optimizations, where tackling
          real-world issues leads to significant growth.
        </p>

        <h2>Basic Architecture</h2>
        <img
          src="https://miro.medium.com/1*MqYPYKdNBiID0mZ-zyE-mA.png"
          alt="Flutter BLoC Pattern Diagram"
          className="float-left"
        />
        <p>
          The time tracking app is designed to help users log activities, track
          time spent, and generate reports. Built with Flutter for
          cross-platform compatibility, the core architecture revolves around
          separation of concerns to ensure scalability and maintainability.
        </p>
        <p>
          At the heart is the BLoC (Business Logic Component) pattern, which I
          adopted for state management. BLoC separates the UI from business
          logic using streams and sinks, making the app reactive and easier to
          test. For instance, events like starting a timer trigger state changes
          that update the UI seamlessly.
        </p>
        <img
          src="https://mobisoftinfotech.com/resources/wp-content/uploads/2025/06/flutter-dio-architecture-diagram.png"
          alt="Dio HTTP Client Illustration"
          className="float-right"
        />
        <p>
          Next, I integrated Dio as the HTTP client for API interactions. Dio's
          features, like interceptors for logging and error handling, made it
          superior to the default http package. It handles requests to the
          backend for saving time logs and fetching user data efficiently.
        </p>
        <p>
          Authentication relies on JWT tokens, which are decoded to extract user
          information. The overall flow: User logs in, receives a JWT, Dio sends
          it in headers for protected routes, and BLoC manages the auth state.
        </p>
        <p>
          To ensure code readability, I followed Flutter best practices: modular
          folders (e.g., features, utils), consistent naming conventions, and
          comments. For example, here's a simplified BLoC event handler:
        </p>
        <SyntaxHighlighter language="dart" style={vscDarkPlus}>
          {`class TimerBloc extends Bloc<TimerEvent, TimerState> {
  TimerBloc() : super(TimerInitial());

  @override
  Stream<TimerState> mapEventToState(TimerEvent event) async* {
    if (event is StartTimer) {
      // Logic to start timer and update state
      yield TimerRunning(duration: event.duration);
    }
  }
}`}
        </SyntaxHighlighter>
        <p>
          This structure kept the code organized and easy for future me (or
          collaborators) to understand.
        </p>

        <hr />

        <h2>Challenges Faced and Solutions Implemented</h2>
        <p>
          Like any real-world project, this one came with hurdles. Drawing from
          case studies on performance tweaks, I approached each issue
          methodically, measuring impacts where possible (e.g., via debug logs
          and app responsiveness).
        </p>

        <h3>1. Setting Up the Project</h3>
        <p>
          During the initial setup, several issues emerged — mismatched
          dependencies, outdated Flutter SDK, and environment configuration
          errors that prevented the app from running properly. To resolve these,
          I standardized the environment setup by creating a{" "}
          <code>local.env</code> file containing all necessary configuration
          variables:
        </p>

        <SyntaxHighlighter language="bash" style={vscDarkPlus}>
          {`AUTH_TOKEN=teSfTtPh6Toq6i57fosE6c
ONESIGNAL_APP_ID=7b19d7a3-dac4-4f28-b495-xxx
BASE_URL=http://localhost:7777
BASE_URL_DEV=http://localhost:7777
PRIVACY_POLICY=http://localhost:7777/privacy
PRIVACY_POLICY_DEV=http://localhost:7777/privacy`}
        </SyntaxHighlighter>

        <p>
          Once the configuration file was properly set up, I ran the following
          command to rebuild generated files and automatically delete any
          conflicting outputs:
        </p>

        <SyntaxHighlighter language="bash" style={vscDarkPlus}>
          {`flutter pub run build_runner build --delete-conflicting-outputs`}
        </SyntaxHighlighter>

        <p>
          This process resolved most dependency and environment issues. Finally,
          I verified the setup by running the application in development mode:
        </p>

        <SyntaxHighlighter language="bash" style={vscDarkPlus}>
          {`flutter run --flavor development`}
        </SyntaxHighlighter>

        <p>
          Through this setup challenge, I learned the importance of maintaining
          version consistency, clean environment configurations, and automated
          rebuild processes to ensure smooth project initialization.
        </p>

        <h3>2. Understanding the Previous Code Flow</h3>
        <p>
          At first glance, the existing code wasn’t overly complex, but I
          struggled to understand its structure because I was not yet familiar
          with the BLoC pattern and clean architecture principles. The project
          used state management and layered separation that I hadn’t fully
          grasped before, which initially made the flow seem confusing.
        </p>
        <p>
          <strong>Solution:</strong> After studying the BLoC pattern in more
          depth, I realized that the logic separation actually made the code
          more maintainable. I mapped out the event–state flow using diagrams
          and debug prints to understand how data moved between layers. Once I
          got familiar with the structure, the overall logic turned out to be
          straightforward and well organized.
        </p>
        <p>
          For Dio integration, I kept the existing clean approach and
          centralized all network requests into a single service to improve
          clarity and reduce redundancy:
        </p>

        <SyntaxHighlighter language="dart" style={vscDarkPlus}>
          {`final dio = Dio(BaseOptions(baseUrl: 'https://api.example.com'));

Future<Map<String, dynamic>> fetchTimeLogs(String token) async {
  try {
    final response = await dio.get(
      '/logs',
      options: Options(headers: {'Authorization': 'Bearer $token'}),
    );
    return response.data;
  } catch (e) {
    throw Exception('Failed to fetch logs: $e');
  }
}`}
        </SyntaxHighlighter>

        <p>
          This process helped me better understand how BLoC and clean code
          principles work together — the code wasn’t difficult, I simply needed
          time to adapt to its structured and modular design. Once understood,
          maintaining and extending the code became much easier.
        </p>

        <h3>3. Decoding JWT Tokens</h3>
        <img
          src="https://shiftasia.com/community/content/images/2023/06/c8e1e25eb622cdb137f5cdaed0d240f6.png"
          alt="JWT Token Decoding Example"
          className="float-left"
        />
        <p>
          Handling JWT for secure user sessions was new to me. Decoding the
          token to access claims like user ID without libraries felt cumbersome,
          and improper handling risked security issues.
        </p>
        <p>
          <strong>Solution:</strong> I used the <code>jwt_decode</code> package
          for safe parsing. After adding it to pubspec.yaml, decoding became
          straightforward:
        </p>
        <SyntaxHighlighter language="dart" style={vscDarkPlus}>
          {`import 'package:jwt_decode/jwt_decode.dart';

Map<String, dynamic> decodeToken(String token) {
  return Jwt.parseJwt(token);
}`}
        </SyntaxHighlighter>
        <p>
          I also implemented token refresh logic in Dio interceptors to handle
          expirations. Challenges like invalid signatures were debugged using
          online JWT inspectors initially, then integrated into the app. This
          boosted my confidence in secure mobile auth.
        </p>
        <p>
          Each challenge reinforced best practices: Measure (e.g., log times),
          refactor incrementally, and document changes.
        </p>

        <hr />

        <h2>Conclusion</h2>
        <p>
          Building this time tracking app has been transformative. Mastering
          BLoC elevated my state management skills, Dio streamlined networking,
          and emphasizing clean code made the project sustainable. Overcoming
          setup woes, code flows, and JWT hurdles mirrored real-world dev
          scenarios, much like optimizing backend latencies in case studies. Key
          takeaway: Growth comes from embracing challenges and applying
          structured solutions. If you're starting a similar project, focus on
          architecture early— it pays off.
        </p>
      </div>
    </div>
  );
};

export default Article;
