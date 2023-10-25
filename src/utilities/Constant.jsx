
export const homeTypeList = [{ value: 1, label: 'All' }, { value: 2, label: '1BHK' }, { value: 3, label: '2BHK' }, { value: 4, label: 'PG' }, { value: 9999, label: 'Other' }]
export const livingTypeList = [{ value: 1, label: 'All' }, { value: 2, label: 'Boys' }, { value: 3, label: 'Girls' }, { value: 4, label: 'Co-Living' }, { value: 9999, label: 'Other' }]
export const sharingTypeList = [{ value: 1, label: 'All' }, { value: 2, label: 'Single' }, { value: 3, label: 'Double Sharing' }, { value: 4, label: '3 Sharing' }, { value: 9999, label: 'Other' }]
export const priceRangeList = [{ value: 1, label: 'All' }, { value: 2, label: '1000-5000' }, { value: 3, label: '5000-10000' }, { value: 4, label: '10000-15000' }, { value: 4, label: '15000-25000' }, { value: 4, label: '25000+' }, { value: 9999, label: 'Other' }]
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
export const roomServiceQuestions = [
  {
    "question_id": "0",
    "question_label": "Food available ?",
    "answer_options": [
      {
        "answer_id": "1",
        "answer_label": "Yes",
        "value": true
      },
      {
        "answer_id": "2",
        "answer_label": "No",
        "value": false
      }
    ]
  },
  {
    "question_id": "1",
    "question_label": "Do you have an AC available?",
    "answer_options": [
      {
        "answer_id": "1",
        "answer_label": "Yes",
        "value": true
      },
      {
        "answer_id": "2",
        "answer_label": "No",
        "value": false
      }
    ]
  },
  {
    "question_id": "2",
    "question_label": "Is Wi-Fi provided?",
    "answer_options": [
      {
        "answer_id": "1",
        "answer_label": "Yes",
        "value": true
      },
      {
        "answer_id": "2",
        "answer_label": "No",
        "value": false
      }
    ]
  },
  {
    "question_id": "3",
    "question_label": "Do you offer a washing machine?",
    "answer_options": [
      {
        "answer_id": "1",
        "answer_label": "Yes",
        "value": true
      },
      {
        "answer_id": "2",
        "answer_label": "No",
        "value": false
      }
    ]
  },
  {
    "question_id": "4",
    "question_label": "Is there a power backup available?",
    "answer_options": [
      {
        "answer_id": "1",
        "answer_label": "Yes",
        "value": true
      },
      {
        "answer_id": "2",
        "answer_label": "No",
        "value": false
      }
    ]
  },
  {
    "question_id": "5",
    "question_label": "Is room cleaning provided?",
    "answer_options": [
      {
        "answer_id": "1",
        "answer_label": "Yes",
        "value": true
      },
      {
        "answer_id": "2",
        "answer_label": "No",
        "value": false
      }
    ]
  },
  {
    "question_id": "6",
    "question_label": "Is the room fully furnished?",
    "answer_options": [
      {
        "answer_id": "1",
        "answer_label": "Yes",
        "value": true
      },
      {
        "answer_id": "2",
        "answer_label": "No",
        "value": false
      }
    ]
  },
  {
    "question_id": "4",
    "question_label": "Is there a common area available?",
    "answer_options": [
      {
        "answer_id": "1",
        "answer_label": "Yes",
        "value": true
      },
      {
        "answer_id": "2",
        "answer_label": "No",
        "value": false
      }
    ]
  },
  {
    "question_id": "1",
    "question_label": "Is RO Water available?",
    "answer_options": [
      {
        "answer_id": "1",
        "answer_label": "Yes",
        "value": true
      },
      {
        "answer_id": "2",
        "answer_label": "No",
        "value": false
      }
    ]
  },
  {
    "question_id": "2",
    "question_label": "Is there a Refrigerator available?",
    "answer_options": [
      {
        "answer_id": "1",
        "answer_label": "Yes",
        "value": true
      },
      {
        "answer_id": "2",
        "answer_label": "No",
        "value": false
      }
    ]
  }
];

export const $Constant = {
  isEmailRegex: function (value) {
    let regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(value);
  },
  isPasswordRegex: function (value) {
    let regex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&-+=()])(?=\S+$).{8,20}$/;
    return regex.test(value)
  },
  isCheckUndefineNullBlank:function(value){
    if(value ==undefined || value ==null || value=='' ){
      return true
   }
  }


}


