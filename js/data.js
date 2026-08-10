// Datos de ciudades, empresas y horarios actualizados (Sólo demo Tupungato)
const BUS_DATA = {
  "cities": [
    {
      "id": "tupungato",
      "name": "Tupungato"
    },
    {
      "id": "mendoza",
      "name": "Mendoza"
    },
    {
      "id": "tunuyan",
      "name": "Tunuyán"
    },
    {
      "id": "eugeniobustos",
      "name": "Eugenio Bustos"
    },
    {
      "id": "laconsulta",
      "name": "La Consulta"
    },
    {
      "id": "vistaflores",
      "name": "Vista Flores"
    }
  ],
  "companies": {
    "cata": {
      "name": "CATA Internacional",
      "short": "CATA",
      "badge": "badge-primary"
    },
    "sancarlos": {
      "name": "Transportes San Carlos",
      "short": "TSC",
      "badge": "badge-secondary"
    },
    "mitre": {
      "name": "Expreso Mitre",
      "short": "MITRE",
      "badge": "badge-accent"
    }
  },
  "routes": [
    {
      "id": "tupungato-mendoza",
      "origin": "tupungato",
      "destination": "mendoza",
      "company": "mitre",
      "line": "Tupungato - Mendoza",
      "platform": "Terminal",
      "estimatedPrice": "$1.500",
      "schedules": {
        "weekdays": [
          {
            "time": "05:15",
            "service": "Común",
            "via": "x Zapata"
          },
          {
            "time": "06:00",
            "service": "Común",
            "via": "x Cervantes"
          },
          {
            "time": "06:30",
            "service": "Común",
            "via": "x Los Cerrillos"
          },
          {
            "time": "07:30",
            "service": "Común",
            "via": "x Los Cerrillos"
          },
          {
            "time": "08:00",
            "service": "Diferencial",
            "via": "x Zapata"
          },
          {
            "time": "09:30",
            "service": "Diferencial",
            "via": "x Los Cerrillos"
          },
          {
            "time": "10:45",
            "service": "Diferencial",
            "via": "x Los Cerrillos"
          },
          {
            "time": "11:30",
            "service": "Diferencial",
            "via": "x Zapata"
          },
          {
            "time": "13:00",
            "service": "Diferencial",
            "via": "x Los Cerrillos"
          },
          {
            "time": "14:00",
            "service": "Diferencial",
            "via": "x Zapata"
          },
          {
            "time": "14:30",
            "service": "Diferencial",
            "via": "x Los Cerrillos"
          },
          {
            "time": "15:30",
            "service": "Diferencial",
            "via": "x Los Cerrillos"
          },
          {
            "time": "17:00",
            "service": "Diferencial",
            "via": "x Los Cerrillos"
          },
          {
            "time": "17:30",
            "service": "Diferencial",
            "via": "x Los Cerrillos"
          },
          {
            "time": "18:30",
            "service": "Diferencial",
            "via": "x Los Cerrillos"
          },
          {
            "time": "20:00",
            "service": "Diferencial",
            "via": "x Los Cerrillos"
          },
          {
            "time": "21:30",
            "service": "Diferencial",
            "via": "x Zapata"
          }
        ],
        "saturdays": [],
        "sundays": []
      }
    },
    {
      "id": "mendoza-tupungato",
      "origin": "mendoza",
      "destination": "tupungato",
      "company": "mitre",
      "line": "Mendoza - Tupungato",
      "platform": "Terminal",
      "estimatedPrice": "$1.500",
      "schedules": {
        "weekdays": [
          {
            "time": "06:30",
            "service": "Común",
            "via": "x Los Cerrillos"
          },
          {
            "time": "07:00",
            "service": "Común",
            "via": "x Los Cerrillos"
          },
          {
            "time": "07:30",
            "service": "Común",
            "via": "x Los Cerrillos"
          },
          {
            "time": "08:30",
            "service": "Común",
            "via": "x Zapata"
          },
          {
            "time": "09:15",
            "service": "Común",
            "via": "x Los Cerrillos"
          },
          {
            "time": "10:00",
            "service": "Común",
            "via": "x Los Cerrillos"
          },
          {
            "time": "11:25",
            "service": "Común",
            "via": "x Los Cerrillos"
          },
          {
            "time": "11:30",
            "service": "Común",
            "via": "x Zapata"
          },
          {
            "time": "12:30",
            "service": "Común",
            "via": "x Los Cerrillos"
          },
          {
            "time": "13:00",
            "service": "Común",
            "via": "x Los Cerrillos"
          },
          {
            "time": "14:00",
            "service": "Común",
            "via": "x Los Cerrillos"
          },
          {
            "time": "15:30",
            "service": "Común",
            "via": "x Los Cerrillos"
          },
          {
            "time": "16:00",
            "service": "Común",
            "via": "x Los Cerrillos"
          },
          {
            "time": "17:30",
            "service": "Común",
            "via": "x Zapata"
          },
          {
            "time": "18:30",
            "service": "Común",
            "via": "x Los Cerrillos"
          },
          {
            "time": "19:00",
            "service": "Común",
            "via": "x Los Cerrillos"
          },
          {
            "time": "19:30",
            "service": "Común",
            "via": "x Cervantes"
          },
          {
            "time": "20:00",
            "service": "Común",
            "via": "x Los Cerrillos"
          },
          {
            "time": "21:00",
            "service": "Común",
            "via": "x Zapata"
          },
          {
            "time": "22:00",
            "service": "Común",
            "via": "x Los Cerrillos"
          }
        ],
        "saturdays": [
          {
            "time": "06:30",
            "service": "Común",
            "via": "x Los Cerrillos"
          },
          {
            "time": "07:15",
            "service": "Común",
            "via": "x Los Cerrillos"
          },
          {
            "time": "08:30",
            "service": "Común",
            "via": "x Zapata"
          },
          {
            "time": "09:15",
            "service": "Común",
            "via": "x Los Cerrillos"
          },
          {
            "time": "10:30",
            "service": "Común",
            "via": "x Los Cerrillos"
          },
          {
            "time": "11:30",
            "service": "Común",
            "via": "x Zapata"
          },
          {
            "time": "12:30",
            "service": "Común",
            "via": "x Los Cerrillos"
          },
          {
            "time": "13:00",
            "service": "Común",
            "via": "x Los Cerrillos"
          },
          {
            "time": "14:00",
            "service": "Común",
            "via": "x Los Cerrillos"
          },
          {
            "time": "15:30",
            "service": "Común",
            "via": "x Los Cerrillos"
          },
          {
            "time": "16:00",
            "service": "Común",
            "via": "x Los Cerrillos"
          },
          {
            "time": "17:30",
            "service": "Común",
            "via": "x Zapata"
          },
          {
            "time": "18:30",
            "service": "Común",
            "via": "x Los Cerrillos"
          },
          {
            "time": "19:00",
            "service": "Común",
            "via": "x Los Cerrillos"
          },
          {
            "time": "20:00",
            "service": "Común",
            "via": "x Los Cerrillos"
          },
          {
            "time": "21:00",
            "service": "Común",
            "via": "x Zapata"
          },
          {
            "time": "22:00",
            "service": "Común",
            "via": "x Los Cerrillos"
          }
        ],
        "sundays": [
          {
            "time": "06:30",
            "service": "Común",
            "via": "x Los Cerrillos"
          },
          {
            "time": "07:15",
            "service": "Común",
            "via": "x Los Cerrillos"
          },
          {
            "time": "08:30",
            "service": "Común",
            "via": "x Zapata"
          },
          {
            "time": "09:15",
            "service": "Común",
            "via": "x Los Cerrillos"
          },
          {
            "time": "10:30",
            "service": "Común",
            "via": "x Los Cerrillos"
          },
          {
            "time": "11:30",
            "service": "Común",
            "via": "x Zapata"
          },
          {
            "time": "12:30",
            "service": "Común",
            "via": "x Los Cerrillos"
          },
          {
            "time": "13:00",
            "service": "Común",
            "via": "x Los Cerrillos"
          },
          {
            "time": "14:00",
            "service": "Común",
            "via": "x Los Cerrillos"
          },
          {
            "time": "15:30",
            "service": "Común",
            "via": "x Los Cerrillos"
          },
          {
            "time": "16:00",
            "service": "Común",
            "via": "x Los Cerrillos"
          },
          {
            "time": "17:30",
            "service": "Común",
            "via": "x Zapata"
          },
          {
            "time": "18:30",
            "service": "Común",
            "via": "x Los Cerrillos"
          },
          {
            "time": "19:00",
            "service": "Común",
            "via": "x Los Cerrillos"
          },
          {
            "time": "20:00",
            "service": "Común",
            "via": "x Los Cerrillos"
          },
          {
            "time": "21:00",
            "service": "Común",
            "via": "x Zapata"
          },
          {
            "time": "22:00",
            "service": "Común",
            "via": "x Los Cerrillos"
          }
        ]
      }
    },
    {
      "id": "tunuyan-tupungato",
      "origin": "tunuyan",
      "destination": "tupungato",
      "company": "sancarlos",
      "line": "Tunuyán - Tupungato",
      "platform": "Terminal",
      "estimatedPrice": "$1.500",
      "schedules": {
        "weekdays": [
          {
            "time": "06:15",
            "service": "Común",
            "via": "x Cordón del Plata"
          },
          {
            "time": "07:10",
            "service": "Común",
            "via": "x Zampal"
          },
          {
            "time": "07:30",
            "service": "Común",
            "via": "x Cordón del Plata"
          },
          {
            "time": "08:10",
            "service": "Común",
            "via": "x Cordón del Plata"
          },
          {
            "time": "08:30",
            "service": "Común",
            "via": "x Cordón del Plata"
          },
          {
            "time": "08:45",
            "service": "Común",
            "via": "x Cordón del Plata"
          },
          {
            "time": "09:30",
            "service": "Común",
            "via": "x Cordón del Plata"
          },
          {
            "time": "10:25",
            "service": "Común",
            "via": "x Cordón del Plata"
          },
          {
            "time": "11:00",
            "service": "Común",
            "via": "x Cordón del Plata"
          },
          {
            "time": "11:30",
            "service": "Común",
            "via": "x Cordón del Plata"
          },
          {
            "time": "12:00",
            "service": "Común",
            "via": "x Cordón del Plata"
          },
          {
            "time": "12:05",
            "service": "Común",
            "via": "x Zampal"
          },
          {
            "time": "12:40",
            "service": "Común",
            "via": "x Cordón del Plata"
          },
          {
            "time": "13:30",
            "service": "Común",
            "via": "x Dubois"
          },
          {
            "time": "13:40",
            "service": "Común",
            "via": "x Cordón del Plata"
          },
          {
            "time": "14:30",
            "service": "Común",
            "via": "x Agua Amarga"
          },
          {
            "time": "15:00",
            "service": "Común",
            "via": "x Cordón del Plata"
          },
          {
            "time": "16:30",
            "service": "Común",
            "via": "x Cordón del Plata"
          },
          {
            "time": "17:30",
            "service": "Común",
            "via": "x Cordón del Plata"
          },
          {
            "time": "17:40",
            "service": "Común",
            "via": "x Cordón del Plata"
          },
          {
            "time": "18:30",
            "service": "Común",
            "via": "x Cordón del Plata"
          },
          {
            "time": "19:00",
            "service": "Común",
            "via": "x Dubois"
          },
          {
            "time": "19:10",
            "service": "Común",
            "via": "x Zampal"
          },
          {
            "time": "19:30",
            "service": "Común",
            "via": "x Cordón del Plata"
          },
          {
            "time": "19:40",
            "service": "Común",
            "via": "x Cordón del Plata"
          },
          {
            "time": "20:00",
            "service": "Común",
            "via": "x Agua Amarga"
          },
          {
            "time": "20:30",
            "service": "Común",
            "via": "x Cordón del Plata"
          },
          {
            "time": "20:45",
            "service": "Común",
            "via": "x Cordón del Plata"
          },
          {
            "time": "21:45",
            "service": "Común",
            "via": "x Cordón del Plata"
          },
          {
            "time": "23:00",
            "service": "Común",
            "via": "x Cordón del Plata"
          },
          {
            "time": "23:45",
            "service": "Común",
            "via": "x Cordón del Plata"
          }
        ],
        "saturdays": [
          {
            "time": "06:15",
            "service": "Común",
            "via": "x Cordón del Plata"
          },
          {
            "time": "07:10",
            "service": "Común",
            "via": "x Zampal"
          },
          {
            "time": "07:30",
            "service": "Común",
            "via": "x Cordón del Plata"
          },
          {
            "time": "08:10",
            "service": "Común",
            "via": "x Cordón del Plata"
          },
          {
            "time": "08:30",
            "service": "Común",
            "via": "x Cordón del Plata"
          },
          {
            "time": "08:45",
            "service": "Común",
            "via": "x Cordón del Plata"
          },
          {
            "time": "09:30",
            "service": "Común",
            "via": "x Cordón del Plata"
          },
          {
            "time": "10:25",
            "service": "Común",
            "via": "x Cordón del Plata"
          },
          {
            "time": "11:00",
            "service": "Común",
            "via": "x Cordón del Plata"
          },
          {
            "time": "11:30",
            "service": "Común",
            "via": "x Cordón del Plata"
          },
          {
            "time": "12:00",
            "service": "Común",
            "via": "x Cordón del Plata"
          },
          {
            "time": "12:05",
            "service": "Común",
            "via": "x Zampal"
          },
          {
            "time": "12:40",
            "service": "Común",
            "via": "x Cordón del Plata"
          },
          {
            "time": "13:30",
            "service": "Común",
            "via": "x Dubois"
          },
          {
            "time": "13:40",
            "service": "Común",
            "via": "x Cordón del Plata"
          },
          {
            "time": "14:30",
            "service": "Común",
            "via": "x Agua Amarga"
          },
          {
            "time": "15:00",
            "service": "Común",
            "via": "x Cordón del Plata"
          },
          {
            "time": "16:30",
            "service": "Común",
            "via": "x Cordón del Plata"
          },
          {
            "time": "17:30",
            "service": "Común",
            "via": "x Cordón del Plata"
          },
          {
            "time": "17:40",
            "service": "Común",
            "via": "x Cordón del Plata"
          },
          {
            "time": "18:30",
            "service": "Común",
            "via": "x Cordón del Plata"
          },
          {
            "time": "19:00",
            "service": "Común",
            "via": "x Dubois"
          },
          {
            "time": "19:10",
            "service": "Común",
            "via": "x Zampal"
          },
          {
            "time": "19:30",
            "service": "Común",
            "via": "x Cordón del Plata"
          },
          {
            "time": "19:40",
            "service": "Común",
            "via": "x Cordón del Plata"
          },
          {
            "time": "20:00",
            "service": "Común",
            "via": "x Agua Amarga"
          },
          {
            "time": "20:30",
            "service": "Común",
            "via": "x Cordón del Plata"
          },
          {
            "time": "20:45",
            "service": "Común",
            "via": "x Cordón del Plata"
          },
          {
            "time": "21:45",
            "service": "Común",
            "via": "x Cordón del Plata"
          },
          {
            "time": "23:00",
            "service": "Común",
            "via": "x Cordón del Plata"
          },
          {
            "time": "23:45",
            "service": "Común",
            "via": "x Cordón del Plata"
          }
        ],
        "sundays": [
          {
            "time": "06:15",
            "service": "Común",
            "via": "x Cordón del Plata"
          },
          {
            "time": "07:20",
            "service": "Común",
            "via": "x Cordón del Plata"
          },
          {
            "time": "08:30",
            "service": "Común",
            "via": "x Cordón del Plata"
          },
          {
            "time": "09:30",
            "service": "Común",
            "via": "x Cordón del Plata"
          },
          {
            "time": "10:40",
            "service": "Común",
            "via": "x Cordón del Plata"
          },
          {
            "time": "11:30",
            "service": "Común",
            "via": "x Cordón del Plata"
          },
          {
            "time": "12:05",
            "service": "Común",
            "via": "x Zampal"
          },
          {
            "time": "12:50",
            "service": "Común",
            "via": "x Cordón del Plata"
          },
          {
            "time": "14:20",
            "service": "Común",
            "via": "x Agua Amarga"
          },
          {
            "time": "15:00",
            "service": "Común",
            "via": "x Cordón del Plata"
          },
          {
            "time": "16:15",
            "service": "Común",
            "via": "x Cordón del Plata"
          },
          {
            "time": "17:05",
            "service": "Común",
            "via": "x Cordón del Plata"
          },
          {
            "time": "17:30",
            "service": "Común",
            "via": "x Cordón del Plata"
          },
          {
            "time": "18:30",
            "service": "Común",
            "via": "x Cordón del Plata"
          },
          {
            "time": "19:10",
            "service": "Común",
            "via": "x Zampal"
          },
          {
            "time": "19:30",
            "service": "Común",
            "via": "x Cordón del Plata"
          },
          {
            "time": "20:15",
            "service": "Común",
            "via": "x Cordón del Plata"
          },
          {
            "time": "20:30",
            "service": "Común",
            "via": "x Cordón del Plata"
          },
          {
            "time": "22:00",
            "service": "Común",
            "via": "x Cordón del Plata"
          },
          {
            "time": "23:45",
            "service": "Común",
            "via": "x Cordón del Plata"
          }
        ]
      }
    },
    {
      "id": "tupungato-tunuyan",
      "origin": "tupungato",
      "destination": "tunuyan",
      "company": "sancarlos",
      "line": "Tupungato - Tunuyán",
      "platform": "Terminal",
      "estimatedPrice": "$1.500",
      "schedules": {
        "weekdays": [
          {
            "time": "5:15",
            "service": "Común",
            "via": "x Córdón del Plata"
          },
          {
            "time": "5:50",
            "service": "Común",
            "via": "x Agua Amarga"
          },
          {
            "time": "6:00",
            "service": "Común",
            "via": "x Zampal"
          },
          {
            "time": "7:00",
            "service": "Común",
            "via": "x Córdón del Plata"
          },
          {
            "time": "7:35",
            "service": "Común",
            "via": "x Dubois"
          },
          {
            "time": "8:00",
            "service": "Expreso",
            "via": "x Córdón del Plata"
          },
          {
            "time": "8:05",
            "service": "Común",
            "via": "x Córdón del Plata"
          },
          {
            "time": "9:00",
            "service": "Común",
            "via": "x Córdón del Plata"
          },
          {
            "time": "9:30",
            "service": "Expreso",
            "via": "x Córdón del Plata"
          },
          {
            "time": "10:00",
            "service": "Común",
            "via": "x Córdón del Plata"
          },
          {
            "time": "10:30",
            "service": "Común",
            "via": "x Córdón del Plata"
          },
          {
            "time": "11:00",
            "service": "Común",
            "via": "x Córdón del Plata"
          },
          {
            "time": "11:00",
            "service": "Común",
            "via": "x Córdón del Plata"
          },
          {
            "time": "11:30",
            "service": "Común",
            "via": "x Córdón del Plata"
          },
          {
            "time": "12:30",
            "service": "Común",
            "via": "x Córdón del Plata"
          },
          {
            "time": "12:30",
            "service": "Común",
            "via": "x Dubois"
          },
          {
            "time": "12:45",
            "service": "Expreso",
            "via": "x Dubois"
          },
          {
            "time": "13:00",
            "service": "Común",
            "via": "x Córdón del Plata"
          },
          {
            "time": "14:05",
            "service": "Común",
            "via": "x Zampal"
          },
          {
            "time": "15:00",
            "service": "Común",
            "via": "x Córdón del Plata"
          },
          {
            "time": "15:45",
            "service": "Común",
            "via": "x Agua Amarga"
          },
          {
            "time": "16:10",
            "service": "Común",
            "via": "x Córdón del Plata"
          },
          {
            "time": "16:50",
            "service": "Expreso",
            "via": "x Córdón del Plata"
          },
          {
            "time": "17:00",
            "service": "Común",
            "via": "x Córdón del Plata"
          },
          {
            "time": "18:00",
            "service": "Común",
            "via": "x Córdón del Plata"
          },
          {
            "time": "18:20",
            "service": "Común",
            "via": "x Dubois"
          },
          {
            "time": "18:45",
            "service": "Expreso",
            "via": "x Córdón del Plata"
          },
          {
            "time": "19:00",
            "service": "Común",
            "via": "x Córdón del Plata"
          },
          {
            "time": "20:30",
            "service": "Común",
            "via": "x Córdón del Plata"
          },
          {
            "time": "21:30",
            "service": "Común",
            "via": "x Córdón del Plata"
          },
          {
            "time": "23:00",
            "service": "Común",
            "via": "x Córdón del Plata"
          }
        ],
        "saturdays": [
          {
            "time": "5:45",
            "service": "Común",
            "via": "x Córdón del Plata"
          },
          {
            "time": "6:50",
            "service": "Común",
            "via": "x Agua Amarga"
          },
          {
            "time": "7:00",
            "service": "Común",
            "via": "x Córdón del Plata"
          },
          {
            "time": "7:30",
            "service": "Común",
            "via": "x Zampal"
          },
          {
            "time": "8:05",
            "service": "Común",
            "via": "x Córdón del Plata"
          },
          {
            "time": "9:00",
            "service": "Común",
            "via": "x Córdón del Plata"
          },
          {
            "time": "10:00",
            "service": "Común",
            "via": "x Córdón del Plata"
          },
          {
            "time": "11:00",
            "service": "Común",
            "via": "x Zampal"
          },
          {
            "time": "11:30",
            "service": "Común",
            "via": "x Córdón del Plata"
          },
          {
            "time": "12:00",
            "service": "Común",
            "via": "x Córdón del Plata"
          },
          {
            "time": "13:00",
            "service": "Común",
            "via": "x Córdón del Plata"
          },
          {
            "time": "13:50",
            "service": "Común",
            "via": "x Zampal"
          },
          {
            "time": "15:15",
            "service": "Común",
            "via": "x Córdón del Plata"
          },
          {
            "time": "15:30",
            "service": "Común",
            "via": "x Agua Amarga"
          },
          {
            "time": "16:10",
            "service": "Común",
            "via": "x Córdón del Plata"
          },
          {
            "time": "17:00",
            "service": "Común",
            "via": "x Córdón del Plata"
          },
          {
            "time": "18:00",
            "service": "Común",
            "via": "x Córdón del Plata"
          },
          {
            "time": "19:10",
            "service": "Común",
            "via": "x Córdón del Plata"
          },
          {
            "time": "20:30",
            "service": "Común",
            "via": "x Córdón del Plata"
          },
          {
            "time": "21:30",
            "service": "Común",
            "via": "x Córdón del Plata"
          },
          {
            "time": "23:00",
            "service": "Común",
            "via": "x Córdón del Plata"
          }
        ],
        "sundays": [
          {
            "time": "5:45",
            "service": "Común",
            "via": "x Córdón del Plata"
          },
          {
            "time": "6:15",
            "service": "Común",
            "via": "x Agua Amarga"
          },
          {
            "time": "7:00",
            "service": "Común",
            "via": "x Córdón del Plata"
          },
          {
            "time": "7:30",
            "service": "Común",
            "via": "x Zampal"
          },
          {
            "time": "8:05",
            "service": "Común",
            "via": "x Córdón del Plata"
          },
          {
            "time": "9:15",
            "service": "Común",
            "via": "x Córdón del Plata"
          },
          {
            "time": "10:00",
            "service": "Común",
            "via": "x Córdón del Plata"
          },
          {
            "time": "11:00",
            "service": "Común",
            "via": "x Zampal"
          },
          {
            "time": "11:30",
            "service": "Común",
            "via": "x Córdón del Plata"
          },
          {
            "time": "12:00",
            "service": "Común",
            "via": "x Córdón del Plata"
          },
          {
            "time": "13:00",
            "service": "Común",
            "via": "x Córdón del Plata"
          },
          {
            "time": "13:50",
            "service": "Común",
            "via": "x Zampal"
          },
          {
            "time": "15:00",
            "service": "Común",
            "via": "x Córdón del Plata"
          },
          {
            "time": "15:30",
            "service": "Común",
            "via": "x Agua Amarga"
          },
          {
            "time": "16:10",
            "service": "Común",
            "via": "x Córdón del Plata"
          },
          {
            "time": "17:00",
            "service": "Común",
            "via": "x Córdón del Plata"
          },
          {
            "time": "18:00",
            "service": "Común",
            "via": "x Córdón del Plata"
          },
          {
            "time": "19:00",
            "service": "Común",
            "via": "x Córdón del Plata"
          },
          {
            "time": "20:30",
            "service": "Común",
            "via": "x Córdón del Plata"
          },
          {
            "time": "21:30",
            "service": "Común",
            "via": "x Córdón del Plata"
          },
          {
            "time": "23:00",
            "service": "Común",
            "via": "x Córdón del Plata"
          },
          {
            "time": "23:00",
            "service": "Común",
            "via": "x Córdón del Plata"
          }
        ]
      }
    },
    {
      "id": "tupungato-eugeniobustos",
      "origin": "tupungato",
      "destination": "eugeniobustos",
      "company": "cata",
      "line": "Tupungato - Eugenio Bustos",
      "platform": "Plataforma 1-2",
      "estimatedPrice": "$1.500",
      "schedules": {
        "weekdays": [
          {
            "time": "06:15",
            "service": "Común",
            "via": "→ 07:25 V. Flores → 07:45 Consulta",
            "highlight": true
          },
          {
            "time": "09:30",
            "service": "Común",
            "via": "→ 10:35 V. Flores → 11:00 Consulta",
            "highlight": true
          },
          {
            "time": "12:00",
            "service": "Común",
            "via": "→ 13:10 V. Flores → 13:30 Consulta",
            "highlight": true
          },
          {
            "time": "14:30",
            "service": "Común",
            "via": "→ 15:35 V. Flores → 16:00 Consulta",
            "highlight": true
          },
          {
            "time": "18:30",
            "service": "Común",
            "via": "→ 19:30 V. Flores → 19:55 Consulta",
            "highlight": true
          },
          {
            "time": "20:00",
            "service": "Común",
            "via": "→ 21:00 V. Flores → 21:25 Consulta",
            "highlight": true
          }
        ],
        "saturdays": [
          {
            "time": "06:15",
            "service": "Común",
            "via": "→ 07:25 V. Flores → 07:45 Consulta",
            "highlight": true
          },
          {
            "time": "09:30",
            "service": "Común",
            "via": "→ 10:35 V. Flores → 11:00 Consulta",
            "highlight": true
          },
          {
            "time": "12:00",
            "service": "Común",
            "via": "→ 13:10 V. Flores → 13:30 Consulta",
            "highlight": true
          },
          {
            "time": "14:30",
            "service": "Común",
            "via": "→ 15:35 V. Flores → 16:00 Consulta",
            "highlight": true
          },
          {
            "time": "18:30",
            "service": "Común",
            "via": "→ 19:30 V. Flores → 19:55 Consulta",
            "highlight": true
          },
          {
            "time": "20:00",
            "service": "Común",
            "via": "→ 21:00 V. Flores → 21:25 Consulta",
            "highlight": true
          }
        ],
        "sundays": [
          {
            "time": "06:15",
            "service": "Común",
            "via": "→ 07:25 V. Flores → 07:45 Consulta",
            "highlight": true
          },
          {
            "time": "09:30",
            "service": "Común",
            "via": "→ 10:35 V. Flores → 11:00 Consulta",
            "highlight": true
          },
          {
            "time": "12:00",
            "service": "Común",
            "via": "→ 13:10 V. Flores → 13:30 Consulta",
            "highlight": true
          },
          {
            "time": "14:30",
            "service": "Común",
            "via": "→ 15:35 V. Flores → 16:00 Consulta",
            "highlight": true
          },
          {
            "time": "18:30",
            "service": "Común",
            "via": "→ 19:30 V. Flores → 19:55 Consulta",
            "highlight": true
          },
          {
            "time": "20:00",
            "service": "Común",
            "via": "→ 21:00 V. Flores → 21:25 Consulta",
            "highlight": true
          }
        ]
      }
    },
    {
      "id": "eugeniobustos-tupungato",
      "origin": "eugeniobustos",
      "destination": "tupungato",
      "company": "cata",
      "line": "Eugenio Bustos - Tupungato",
      "platform": "Plataforma 1",
      "estimatedPrice": "$1.500",
      "schedules": {
        "weekdays": [
          {
            "time": "08:45",
            "service": "Común",
            "via": "→ 08:55 Consulta → 09:20 V. Flores",
            "highlight": true
          },
          {
            "time": "12:30",
            "service": "Común",
            "via": "→ 13:00 Consulta → 13:25 V. Flores",
            "highlight": true
          },
          {
            "time": "14:45",
            "service": "Común",
            "via": "→ 14:55 Consulta → 15:20 V. Flores",
            "highlight": true
          },
          {
            "time": "17:45",
            "service": "Común",
            "via": "→ 18:15 Consulta → 18:40 V. Flores",
            "highlight": true
          },
          {
            "time": "21:00",
            "service": "Común",
            "via": "→ 21:25 Consulta → 21:50 V. Flores",
            "highlight": true
          },
          {
            "time": "22:00",
            "service": "Común",
            "via": "→ 22:25 Consulta → 22:50 V. Flores",
            "highlight": true
          }
        ],
        "saturdays": [
          {
            "time": "08:30",
            "service": "Común",
            "via": "→ 08:55 Consulta → 09:20 V. Flores",
            "highlight": true
          },
          {
            "time": "12:30",
            "service": "Común",
            "via": "→ 13:00 Consulta → 13:25 V. Flores",
            "highlight": true
          },
          {
            "time": "14:00",
            "service": "Común",
            "via": "→ 14:25 Consulta → 14:50 V. Flores",
            "highlight": true
          },
          {
            "time": "17:30",
            "service": "Común",
            "via": "→ 18:00 Consulta → 18:20 V. Flores",
            "highlight": true
          },
          {
            "time": "21:00",
            "service": "Común",
            "via": "→ 21:25 Consulta → 21:50 V. Flores",
            "highlight": true
          },
          {
            "time": "22:00",
            "service": "Común",
            "via": "→ 22:25 Consulta → 22:50 V. Flores",
            "highlight": true
          }
        ],
        "sundays": [
          {
            "time": "08:30",
            "service": "Común",
            "via": "→ 08:55 Consulta → 09:20 V. Flores",
            "highlight": true
          },
          {
            "time": "12:30",
            "service": "Común",
            "via": "→ 13:00 Consulta → 13:25 V. Flores",
            "highlight": true
          },
          {
            "time": "14:00",
            "service": "Común",
            "via": "→ 14:25 Consulta → 14:50 V. Flores",
            "highlight": true
          },
          {
            "time": "17:30",
            "service": "Común",
            "via": "→ 18:00 Consulta → 18:20 V. Flores",
            "highlight": true
          },
          {
            "time": "21:00",
            "service": "Común",
            "via": "→ 21:25 Consulta → 21:50 V. Flores",
            "highlight": true
          },
          {
            "time": "22:00",
            "service": "Común",
            "via": "→ 22:25 Consulta → 22:50 V. Flores",
            "highlight": true
          }
        ]
      }
    }
  ]
};
