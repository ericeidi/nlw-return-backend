import { SubmitFeedbackUseCase } from "./submit-feedback-use-case";

const createFeedbackSpy = jest.fn();
const sendMailSpy = jest.fn();

const submitFeedback = new SubmitFeedbackUseCase(
    { create: createFeedbackSpy },
    { sendMail: sendMailSpy}
)

describe('Submit feedback', () => {
    it('should be able to submit a feedback', async () => {
        await expect(submitFeedback.execute({
            type: 'BUG',
            comment: 'example comment',
            screenshot: 'data:image/png;base64,32142141'
        })).resolves.not.toThrow()

        expect(createFeedbackSpy).toHaveBeenCalled();
        expect(sendMailSpy).toHaveBeenCalled();
    });

    it('should not be able to submit a feedback when there is no type', async () => {
        await expect(submitFeedback.execute({
            type: '',
            comment: 'example comment',
            screenshot: 'data:image/png;base64,32142141'
        })).rejects.toThrowError('Type is required');
    })

    it('should not be able to submit a feedback when the screenshot format is wrong', async () => {
        await expect(submitFeedback.execute({
            type: 'fdsafs',
            comment: 'example comment',
            screenshot: 'test.png'
        })).rejects.toThrowError('Invalid screenshot format')
    })

     it('should not be able to submit a feedback when there is no comment', async () => {
        await expect(submitFeedback.execute({
            type: 'fdsa',
            comment: '',
            screenshot: 'data:image/png;base64,32142141'
        })).rejects.toThrowError('Comment is required')
    })
})

