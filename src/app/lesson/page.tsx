import { Quiz } from "@/components/Quiz";
import { getLesson, getUserProgress, getUserSubscription } from "@/db/queries";
import { redirect } from "next/navigation";

export default async function LessonPage() {

    const lessonPromise = getLesson();
    const userProgressPromise = getUserProgress();
    const userSubscriptionPromise = getUserSubscription();

    const [
        lesson,
        userProgress,
        userSubscription,
    ] = await Promise.all([
        lessonPromise,
        userProgressPromise,
        userSubscriptionPromise
    ]);

    if (!lesson || !userProgress) {
        redirect("/learn");
    }


    const initalPercentage = lesson.challenges
        .filter((chal) => chal.completed)
        .length / lesson.challenges.length * 100;

    return (
        <Quiz
            initalLessonId={lesson.id}
            initalLessonChallenges={lesson.challenges}
            initalHearts={userProgress.hearts}
            initalPercentage={initalPercentage}
            userSubscription={userSubscription}
        />
    );
}

