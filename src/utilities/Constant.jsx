export const allReduxSliceName = ['login', 'loader', 'masterApiSlice']

export const aboutuspagecontent1 = "BookPgWithNk.com serves as a vital bridge connecting students and professionals to affordable, secure PG accommodations across India. Our primary aim is to furnish a convenient, trouble-free solution for those seeking a comfortable abode while pursuing studies or employment in a new city.We empathize with the complexities of securing the perfect PG, especially in unfamiliar territory. Hence, our commitment lies in simplifying this process, ensuring a seamless and stress-free experience for our patrons. Our platform boasts a diverse selection of PG accommodations, catering to various budgets and individual preferences. Furthermore, we offer an effortless booking journey, complete with secure payment methods and around-the-clock customer assistance."
export const aboutPagePeopleReview = [
  {
    "reviewText": 'Thanks to BookPgWithNk, I found a comfortable and safe place to stay within my budget. Their efficient service made the whole booking process smooth and stress-free.',
    "reviewBy": 'Prem Mohan Singh Beniwal'
  },
  {
    "reviewText": "BookPgWithNk made finding accommodation a breeze! Quick and easy process, and they found me the perfect PG that matched all my requirements. Highly recommend!",
    "reviewBy": 'Ajay Panday'
  },
  {
    "reviewText": "I had a great experience with BookPgWithNk. They understood my preferences and provided multiple options that suited my needs. I'm now happily settled in a PG I love!",
    "reviewBy": 'Sapna Gupta'
  },
]

export const $Constant = {
  isEmailRegex: function (value) {
    let regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(value);
  },
  isPasswordRegex: function (value) {
    let regex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&-+=()])(?=\S+$).{8,20}$/;
    return regex.test(value)
  },
  isCheckUndefineNullBlank: function (value) {
    if (value == undefined || value == null || value == '') {
      return true
    }
  }


}

export const createQuestionAnsJson=({question_id,answer_id})=>{
  return{
    question_id:Number(question_id) ?? null,
    answer_id:Number(answer_id) ?? null
  }
}




