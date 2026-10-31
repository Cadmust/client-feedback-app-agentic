import { ReviewUrlForm } from "./review-url-form";

export function Hero() {
  return (
    <section
      aria-labelledby="hero-title"
      className="mx-auto flex w-full max-w-6xl flex-col items-center px-4 pt-10 text-center sm:px-6 sm:pt-14"
    >
      <p className="text-sm font-semibold text-accent-ink">
        Collect feedback on live pages
      </p>
      <h1
        id="hero-title"
        className="mt-4 max-w-3xl text-4xl leading-tight font-extrabold tracking-tight text-balance text-ink sm:text-5xl md:text-6xl"
      >
        One link is all it takes to get clear feedback.
      </h1>
      <p className="mt-5 max-w-xl text-base text-pretty text-body sm:text-lg">
        Share your page. Clients pin comments. You resolve everything in one
        inbox.
      </p>
      <div className="mt-8 w-full">
        <ReviewUrlForm />
      </div>
    </section>
  );
}
