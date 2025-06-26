import { use } from "react";
import { useActionState } from "react";
import { OpinionsContext } from "../store/opinions-context";
import Submit from "./Submit";

export function NewOpinion() {
  const { addOpinion } = use(OpinionsContext);

  async function saveOpinion(prevFormData, formData) {
    //event.preventDefault();
    //const formData = new FormData(event.target);
    const userName = formData.get("userName");
    const title = formData.get("title");
    const opinion = formData.get("body");

    let errors = [];
    if (title.trim().length < 5) {
      errors.push("Title should be atleast 5 letters");
    }
    if (opinion.trim().length < 10 || opinion.trim().length > 300) {
      errors.push(
        "Opinion should be greater than 10 letters and less than 300 letters"
      );
    }
    if (!userName) {
      errors.push("Please enter your name");
    }
    if (errors.length > 0) {
      return {
        formErrors: errors,
        enteredValues: {
          userName,
          title,
          opinion,
        },
      };
    }
    await addOpinion({ userName, title, opinion });
    return { formErrors: null };
  }

  const [formState, formAction] = useActionState(saveOpinion, {
    formErrors: null,
  });

  return (
    <div id="new-opinion">
      <h2>Share your opinion!</h2>
      <form action={formAction}>
        <div className="control-row">
          <p className="control">
            <label htmlFor="userName">Your Name</label>
            <input
              type="text"
              id="userName"
              name="userName"
              defaultValue={formState.enteredValues?.userName}
            />
          </p>

          <p className="control">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              defaultValue={formState.enteredValues?.title}
            />
          </p>
        </div>
        <p className="control">
          <label htmlFor="body">Your Opinion</label>
          <textarea
            id="body"
            name="body"
            rows={5}
            defaultValue={formState.enteredValues?.opinion}
          ></textarea>
        </p>

        {formState.formErrors && (
          <ul className="errors">
            {formState.formErrors.map((error) => (
              <li key={error}>{error}</li>
            ))}
          </ul>
        )}

        <Submit />
      </form>
    </div>
  );
}
