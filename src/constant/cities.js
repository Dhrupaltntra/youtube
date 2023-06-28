const nestedData = [
  {
    name : 'MP',
    children: [
      {
        name: 'Indore',
        children : [
          {
            name : 'Rajwada'
          },
          {
            name : 'Sudama Nagar',
            children : [
              {
                name: 'Aman',
                children : [
                  {
                    name : 'paul'
                  }
                ]
              }
            ]
          },
          {
            name : 'Vijay Nagar'
          },
        ]
      },
      {
        name: 'Bhopal',
        children : [
          {
            name : 'Arera Hills'
          }
        ],
      },
      {
        name : 'Jabalpur',
        children : [
          {
            name : 'Pushp Nagar'
          }
        ]
      }
    ]
  },
  {
    name : 'Gujrat',
      children: [
        {
          name: 'Ahmedabad',
          children : [
            {
              name : 'Bodakdev'
            }
          ]
        }
      ]
  }
]

export default nestedData