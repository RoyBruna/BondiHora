// Datos de ciudades, empresas y horarios actualizados desde horarios.txt

const BUS_DATA = {
  cities: [
    {
        "id": "tupungato",
        "name": "Tupungato (Terminal)"
    },
    {
        "id": "tunuyan",
        "name": "Tunuyán (Terminal)"
    },
    {
        "id": "mendoza",
        "name": "Mendoza (Terminal Capital)"
    },
    {
        "id": "laconsulta",
        "name": "La Consulta"
    },
    {
        "id": "eugeniobustos",
        "name": "Eugenio Bustos"
    },
    {
        "id": "vistaflores",
        "name": "Vista Flores"
    },
    {
        "id": "pareditas",
        "name": "Pareditas"
    },
    {
        "id": "losarboles",
        "name": "Los Árboles"
    },
    {
        "id": "barbero",
        "name": "Barbero"
    },
    {
        "id": "laspintadas",
        "name": "Las Pintadas"
    },
    {
        "id": "chilecito",
        "name": "Chilecito"
    },
    {
        "id": "manzano",
        "name": "Manzano Histórico"
    },
    {
        "id": "laprimavera",
        "name": "La Primavera"
    },
    {
        "id": "campolosandes",
        "name": "Campo de los Andes"
    }
],

  companies: {
    cata: { name: 'CATA Internacional', short: 'CATA', badge: 'badge-primary' },
    sancarlos: { name: 'Transportes San Carlos', short: 'TSC', badge: 'badge-secondary' },
    mitre: { name: 'Expreso Mitre', short: 'MITRE', badge: 'badge-accent' }
  },

  routes: [
    {
        "id": "mendoza-laconsulta",
        "origin": "mendoza",
        "destination": "laconsulta",
        "company": "cata",
        "line": "Recorrido Mendoza (Terminal Capital) - La Consulta",
        "platform": "Plataforma 1-4",
        "estimatedPrice": "$1.500",
        "schedules": {
            "weekdays": [
                {
                    "time": "06:00",
                    "service": "Expreso",
                    "via": "vía SAN CARLOS"
                },
                {
                    "time": "07:00",
                    "service": "Común",
                    "via": "vía V. FLORES"
                },
                {
                    "time": "08:20",
                    "service": "Diferencial",
                    "via": "X RN 40"
                },
                {
                    "time": "09:00",
                    "service": "Expreso",
                    "via": "vía SAN CARLOS"
                },
                {
                    "time": "09:45",
                    "service": "Expreso",
                    "via": "vía SAN CARLOS"
                },
                {
                    "time": "11:00",
                    "service": "Común",
                    "via": "vía V. FLORES"
                },
                {
                    "time": "11:20",
                    "service": "Diferencial",
                    "via": "vía E. BUSTOS"
                },
                {
                    "time": "12:30",
                    "service": "Expreso",
                    "via": "vía V. FLORES"
                },
                {
                    "time": "13:00",
                    "service": "Común",
                    "via": "vía V. FLORES"
                },
                {
                    "time": "16:20",
                    "service": "Expreso",
                    "via": "vía SAN CARLOS"
                },
                {
                    "time": "17:00",
                    "service": "Común",
                    "via": "vía V. FLORES"
                },
                {
                    "time": "19:00",
                    "service": "Diferencial",
                    "via": "vía E. BUSTOS"
                },
                {
                    "time": "19:00",
                    "service": "Común",
                    "via": "X V. FLORES"
                },
                {
                    "time": "21:30",
                    "service": "Expreso",
                    "via": "vía V. FLORES"
                }
            ],
            "saturdays": [
                {
                    "time": "07:00",
                    "service": "Común",
                    "via": "vía V. FLORES"
                },
                {
                    "time": "09:00",
                    "service": "Expreso",
                    "via": "vía SAN CARLOS"
                },
                {
                    "time": "09:45",
                    "service": "Expreso",
                    "via": "vía SAN CARLOS"
                },
                {
                    "time": "11:00",
                    "service": "Común",
                    "via": "vía V. FLORES"
                },
                {
                    "time": "12:30",
                    "service": "Expreso",
                    "via": "vía V. FLORES"
                },
                {
                    "time": "13:00",
                    "service": "Común",
                    "via": "vía V. FLORES"
                },
                {
                    "time": "16:20",
                    "service": "Expreso",
                    "via": "vía SAN CARLOS"
                },
                {
                    "time": "17:00",
                    "service": "Común",
                    "via": "vía V. FLORES"
                },
                {
                    "time": "19:00",
                    "service": "Diferencial",
                    "via": "vía E. BUSTOS"
                },
                {
                    "time": "19:00",
                    "service": "Común",
                    "via": "X V. FLORES"
                },
                {
                    "time": "21:30",
                    "service": "Expreso",
                    "via": "vía V. FLORES"
                }
            ],
            "sundays": [
                {
                    "time": "07:00",
                    "service": "Común",
                    "via": "vía V. FLORES"
                },
                {
                    "time": "09:00",
                    "service": "Expreso",
                    "via": "vía SAN CARLOS"
                },
                {
                    "time": "09:45",
                    "service": "Expreso",
                    "via": "vía SAN CARLOS"
                },
                {
                    "time": "11:00",
                    "service": "Común",
                    "via": "vía V. FLORES"
                },
                {
                    "time": "12:30",
                    "service": "Expreso",
                    "via": "vía V. FLORES"
                },
                {
                    "time": "13:00",
                    "service": "Común",
                    "via": "vía V. FLORES"
                },
                {
                    "time": "16:20",
                    "service": "Expreso",
                    "via": "vía SAN CARLOS"
                },
                {
                    "time": "17:00",
                    "service": "Común",
                    "via": "vía V. FLORES"
                },
                {
                    "time": "19:00",
                    "service": "Común",
                    "via": "X V. FLORES"
                },
                {
                    "time": "21:30",
                    "service": "Expreso",
                    "via": "vía V. FLORES"
                }
            ]
        }
    },
    {
        "id": "mendoza-pareditas",
        "origin": "mendoza",
        "destination": "pareditas",
        "company": "cata",
        "line": "Recorrido Mendoza (Terminal Capital) - Pareditas",
        "platform": "Plataforma 1-4",
        "estimatedPrice": "$1.500",
        "schedules": {
            "weekdays": [
                {
                    "time": "06:00",
                    "service": "Común",
                    "via": "Directo"
                },
                {
                    "time": "08:00",
                    "service": "Común",
                    "via": "vía CHACON"
                },
                {
                    "time": "10:00",
                    "service": "Común",
                    "via": "Directo"
                },
                {
                    "time": "12:00",
                    "service": "Común",
                    "via": "Directo"
                },
                {
                    "time": "12:00",
                    "service": "Expreso",
                    "via": "Directo"
                },
                {
                    "time": "14:00",
                    "service": "Común",
                    "via": "Directo"
                },
                {
                    "time": "15:00",
                    "service": "Común",
                    "via": "vía CHACON"
                },
                {
                    "time": "16:00",
                    "service": "Común",
                    "via": "vía LA CONSULTA"
                },
                {
                    "time": "18:00",
                    "service": "Común",
                    "via": "vía CHACON"
                },
                {
                    "time": "19:30",
                    "service": "Expreso",
                    "via": "Directo"
                },
                {
                    "time": "20:00",
                    "service": "Común",
                    "via": "Directo"
                },
                {
                    "time": "21:00",
                    "service": "Expreso",
                    "via": "Directo"
                }
            ],
            "saturdays": [
                {
                    "time": "06:00",
                    "service": "Común",
                    "via": "Directo"
                },
                {
                    "time": "08:00",
                    "service": "Común",
                    "via": "vía CHACON"
                },
                {
                    "time": "10:00",
                    "service": "Común",
                    "via": "Directo"
                },
                {
                    "time": "12:00",
                    "service": "Común",
                    "via": "Directo"
                },
                {
                    "time": "12:00",
                    "service": "Expreso",
                    "via": "Directo"
                },
                {
                    "time": "14:00",
                    "service": "Común",
                    "via": "Directo"
                },
                {
                    "time": "15:00",
                    "service": "Común",
                    "via": "vía CHACON"
                },
                {
                    "time": "16:00",
                    "service": "Común",
                    "via": "vía LA CONSULTA"
                },
                {
                    "time": "18:00",
                    "service": "Común",
                    "via": "vía CHACON"
                },
                {
                    "time": "19:30",
                    "service": "Expreso",
                    "via": "Directo"
                },
                {
                    "time": "20:00",
                    "service": "Común",
                    "via": "Directo"
                },
                {
                    "time": "21:00",
                    "service": "Expreso",
                    "via": "Directo"
                }
            ],
            "sundays": [
                {
                    "time": "06:00",
                    "service": "Común",
                    "via": "Directo"
                },
                {
                    "time": "08:00",
                    "service": "Común",
                    "via": "vía CHACON"
                },
                {
                    "time": "10:00",
                    "service": "Común",
                    "via": "Directo"
                },
                {
                    "time": "12:00",
                    "service": "Común",
                    "via": "Directo"
                },
                {
                    "time": "12:00",
                    "service": "Expreso",
                    "via": "Directo"
                },
                {
                    "time": "14:00",
                    "service": "Común",
                    "via": "Directo"
                },
                {
                    "time": "15:00",
                    "service": "Común",
                    "via": "vía CHACON"
                },
                {
                    "time": "16:00",
                    "service": "Común",
                    "via": "vía LA CONSULTA"
                },
                {
                    "time": "18:00",
                    "service": "Común",
                    "via": "vía CHACON"
                },
                {
                    "time": "19:30",
                    "service": "Expreso",
                    "via": "Directo"
                },
                {
                    "time": "20:00",
                    "service": "Común",
                    "via": "Directo"
                },
                {
                    "time": "21:00",
                    "service": "Expreso",
                    "via": "Directo"
                }
            ]
        }
    },
    {
        "id": "mendoza-tunuyan",
        "origin": "mendoza",
        "destination": "tunuyan",
        "company": "cata",
        "line": "Recorrido Mendoza (Terminal Capital) - Tunuyán (Terminal)",
        "platform": "Plataforma 1-4",
        "estimatedPrice": "$1.500",
        "schedules": {
            "weekdays": [
                {
                    "time": "06:30",
                    "service": "Diferencial",
                    "via": "Directo"
                },
                {
                    "time": "07:00",
                    "service": "Expreso",
                    "via": "Directo"
                },
                {
                    "time": "07:15",
                    "service": "Diferencial",
                    "via": "Directo"
                },
                {
                    "time": "08:30",
                    "service": "Expreso",
                    "via": "Directo"
                },
                {
                    "time": "09:30",
                    "service": "Diferencial",
                    "via": "Directo"
                },
                {
                    "time": "11:30",
                    "service": "Expreso",
                    "via": "Directo"
                },
                {
                    "time": "12:20",
                    "service": "Diferencial",
                    "via": "Directo"
                },
                {
                    "time": "13:30",
                    "service": "Diferencial",
                    "via": "Directo"
                },
                {
                    "time": "14:00",
                    "service": "Expreso",
                    "via": "Directo"
                },
                {
                    "time": "15:30",
                    "service": "Expreso",
                    "via": "Directo"
                },
                {
                    "time": "17:30",
                    "service": "Expreso",
                    "via": "Directo"
                },
                {
                    "time": "18:20",
                    "service": "Diferencial",
                    "via": "Directo"
                },
                {
                    "time": "20:00",
                    "service": "Diferencial",
                    "via": "Directo"
                },
                {
                    "time": "20:30",
                    "service": "Expreso",
                    "via": "Directo"
                },
                {
                    "time": "22:30",
                    "service": "Expreso",
                    "via": "Directo"
                }
            ],
            "saturdays": [
                {
                    "time": "07:00",
                    "service": "Expreso",
                    "via": "Directo"
                },
                {
                    "time": "08:30",
                    "service": "Expreso",
                    "via": "Directo"
                },
                {
                    "time": "11:30",
                    "service": "Expreso",
                    "via": "Directo"
                },
                {
                    "time": "13:30",
                    "service": "Expreso",
                    "via": "Directo"
                },
                {
                    "time": "15:30",
                    "service": "Expreso",
                    "via": "Directo"
                },
                {
                    "time": "17:30",
                    "service": "Expreso",
                    "via": "Directo"
                },
                {
                    "time": "20:30",
                    "service": "Expreso",
                    "via": "Directo"
                },
                {
                    "time": "22:30",
                    "service": "Expreso",
                    "via": "Directo"
                }
            ],
            "sundays": [
                {
                    "time": "07:00",
                    "service": "Expreso",
                    "via": "Directo"
                },
                {
                    "time": "08:30",
                    "service": "Expreso",
                    "via": "Directo"
                },
                {
                    "time": "11:30",
                    "service": "Expreso",
                    "via": "Directo"
                },
                {
                    "time": "13:30",
                    "service": "Expreso",
                    "via": "Directo"
                },
                {
                    "time": "15:30",
                    "service": "Expreso",
                    "via": "Directo"
                },
                {
                    "time": "17:30",
                    "service": "Expreso",
                    "via": "Directo"
                },
                {
                    "time": "20:30",
                    "service": "Expreso",
                    "via": "Directo"
                },
                {
                    "time": "22:30",
                    "service": "Expreso",
                    "via": "Directo"
                }
            ]
        }
    },
    {
        "id": "mendoza-eugeniobustos",
        "origin": "mendoza",
        "destination": "eugeniobustos",
        "company": "cata",
        "line": "Recorrido Mendoza (Terminal Capital) - Eugenio Bustos",
        "platform": "Plataforma 1-4",
        "estimatedPrice": "$1.500",
        "schedules": {
            "weekdays": [
                {
                    "time": "07:30",
                    "service": "Expreso",
                    "via": "Directo"
                },
                {
                    "time": "10:30",
                    "service": "Expreso",
                    "via": "Directo"
                },
                {
                    "time": "14:30",
                    "service": "Expreso",
                    "via": "Directo"
                },
                {
                    "time": "16:00",
                    "service": "Diferencial",
                    "via": "Directo"
                },
                {
                    "time": "17:00",
                    "service": "Expreso",
                    "via": "Directo"
                },
                {
                    "time": "18:30",
                    "service": "Expreso",
                    "via": "Directo"
                }
            ],
            "saturdays": [
                {
                    "time": "07:30",
                    "service": "Expreso",
                    "via": "Directo"
                },
                {
                    "time": "10:30",
                    "service": "Expreso",
                    "via": "Directo"
                },
                {
                    "time": "14:30",
                    "service": "Expreso",
                    "via": "Directo"
                },
                {
                    "time": "17:00",
                    "service": "Expreso",
                    "via": "Directo"
                },
                {
                    "time": "18:30",
                    "service": "Expreso",
                    "via": "Directo"
                }
            ],
            "sundays": [
                {
                    "time": "07:30",
                    "service": "Expreso",
                    "via": "Directo"
                },
                {
                    "time": "10:30",
                    "service": "Expreso",
                    "via": "Directo"
                },
                {
                    "time": "14:30",
                    "service": "Expreso",
                    "via": "Directo"
                },
                {
                    "time": "17:00",
                    "service": "Expreso",
                    "via": "Directo"
                },
                {
                    "time": "18:30",
                    "service": "Expreso",
                    "via": "Directo"
                }
            ]
        }
    },
    {
        "id": "laconsulta-mendoza",
        "origin": "laconsulta",
        "destination": "mendoza",
        "company": "cata",
        "line": "Recorrido La Consulta - Mendoza (Terminal Capital)",
        "platform": "Plataforma 1-4",
        "estimatedPrice": "$1.500",
        "schedules": {
            "weekdays": [
                {
                    "time": "04:50",
                    "service": "Común",
                    "via": "CONSULTA"
                },
                {
                    "time": "05:15",
                    "service": "Diferencial",
                    "via": "CONSULTA"
                },
                {
                    "time": "05:40",
                    "service": "Expreso",
                    "via": "CONSULTA"
                },
                {
                    "time": "06:50",
                    "service": "Común",
                    "via": "CONSULTA"
                },
                {
                    "time": "08:20",
                    "service": "Expreso",
                    "via": "CONSULTA"
                },
                {
                    "time": "10:25",
                    "service": "Diferencial",
                    "via": "CONSULTA"
                },
                {
                    "time": "10:50",
                    "service": "Común",
                    "via": "CONSULTA"
                },
                {
                    "time": "11:30",
                    "service": "Expreso",
                    "via": "CONSULTA"
                },
                {
                    "time": "13:30",
                    "service": "Expreso",
                    "via": "CONSULTA"
                },
                {
                    "time": "14:50",
                    "service": "Común",
                    "via": "CONSULTA"
                },
                {
                    "time": "15:50",
                    "service": "Diferencial",
                    "via": "CONSULTA"
                },
                {
                    "time": "16:50",
                    "service": "Común",
                    "via": "CONSULTA"
                },
                {
                    "time": "17:40",
                    "service": "Expreso",
                    "via": "CONSULTA"
                },
                {
                    "time": "19:00",
                    "service": "Expreso",
                    "via": "CONSULTA"
                }
            ],
            "saturdays": [
                {
                    "time": "04:50",
                    "service": "Común",
                    "via": "CONSULTA"
                },
                {
                    "time": "05:40",
                    "service": "Expreso",
                    "via": "CONSULTA"
                },
                {
                    "time": "06:50",
                    "service": "Común",
                    "via": "CONSULTA"
                },
                {
                    "time": "08:20",
                    "service": "Expreso",
                    "via": "CONSULTA"
                },
                {
                    "time": "10:50",
                    "service": "Común",
                    "via": "CONSULTA"
                },
                {
                    "time": "11:30",
                    "service": "Expreso",
                    "via": "CONSULTA"
                },
                {
                    "time": "13:30",
                    "service": "Expreso",
                    "via": "CONSULTA"
                },
                {
                    "time": "14:50",
                    "service": "Común",
                    "via": "CONSULTA"
                },
                {
                    "time": "15:50",
                    "service": "Diferencial",
                    "via": "CONSULTA"
                },
                {
                    "time": "16:50",
                    "service": "Común",
                    "via": "CONSULTA"
                },
                {
                    "time": "17:40",
                    "service": "Expreso",
                    "via": "CONSULTA"
                },
                {
                    "time": "19:00",
                    "service": "Expreso",
                    "via": "CONSULTA"
                }
            ],
            "sundays": [
                {
                    "time": "04:50",
                    "service": "Común",
                    "via": "CONSULTA"
                },
                {
                    "time": "06:50",
                    "service": "Común",
                    "via": "CONSULTA"
                },
                {
                    "time": "10:50",
                    "service": "Común",
                    "via": "CONSULTA"
                },
                {
                    "time": "14:50",
                    "service": "Común",
                    "via": "CONSULTA"
                },
                {
                    "time": "16:50",
                    "service": "Común",
                    "via": "CONSULTA"
                },
                {
                    "time": "17:40",
                    "service": "Expreso",
                    "via": "CONSULTA"
                }
            ]
        }
    },
    {
        "id": "pareditas-mendoza",
        "origin": "pareditas",
        "destination": "mendoza",
        "company": "cata",
        "line": "Recorrido Pareditas - Mendoza (Terminal Capital)",
        "platform": "Plataforma 1-4",
        "estimatedPrice": "$1.500",
        "schedules": {
            "weekdays": [
                {
                    "time": "04:50",
                    "service": "Expreso",
                    "via": "Directo"
                },
                {
                    "time": "05:40",
                    "service": "Común",
                    "via": "Directo"
                },
                {
                    "time": "05:40",
                    "service": "Expreso",
                    "via": "Directo"
                },
                {
                    "time": "06:20",
                    "service": "Expreso",
                    "via": "Directo"
                },
                {
                    "time": "07:40",
                    "service": "Común",
                    "via": "Directo"
                },
                {
                    "time": "09:40",
                    "service": "Común",
                    "via": "Directo"
                },
                {
                    "time": "11:40",
                    "service": "Común",
                    "via": "Directo"
                },
                {
                    "time": "13:40",
                    "service": "Común",
                    "via": "Directo"
                },
                {
                    "time": "15:00",
                    "service": "Expreso",
                    "via": "Directo"
                },
                {
                    "time": "15:40",
                    "service": "Común",
                    "via": "Directo"
                },
                {
                    "time": "18:10",
                    "service": "Común",
                    "via": "Directo"
                },
                {
                    "time": "19:40",
                    "service": "Común",
                    "via": "Directo"
                }
            ],
            "saturdays": [
                {
                    "time": "04:50",
                    "service": "Expreso",
                    "via": "Directo"
                },
                {
                    "time": "05:40",
                    "service": "Común",
                    "via": "Directo"
                },
                {
                    "time": "05:40",
                    "service": "Expreso",
                    "via": "Directo"
                },
                {
                    "time": "06:20",
                    "service": "Expreso",
                    "via": "Directo"
                },
                {
                    "time": "07:40",
                    "service": "Común",
                    "via": "Directo"
                },
                {
                    "time": "09:40",
                    "service": "Común",
                    "via": "Directo"
                },
                {
                    "time": "11:40",
                    "service": "Común",
                    "via": "Directo"
                },
                {
                    "time": "13:40",
                    "service": "Común",
                    "via": "Directo"
                },
                {
                    "time": "15:00",
                    "service": "Expreso",
                    "via": "Directo"
                },
                {
                    "time": "18:10",
                    "service": "Común",
                    "via": "Directo"
                },
                {
                    "time": "19:40",
                    "service": "Común",
                    "via": "Directo"
                }
            ],
            "sundays": [
                {
                    "time": "04:50",
                    "service": "Expreso",
                    "via": "Directo"
                },
                {
                    "time": "05:40",
                    "service": "Común",
                    "via": "Directo"
                },
                {
                    "time": "05:40",
                    "service": "Expreso",
                    "via": "Directo"
                },
                {
                    "time": "06:20",
                    "service": "Expreso",
                    "via": "Directo"
                },
                {
                    "time": "07:40",
                    "service": "Común",
                    "via": "Directo"
                },
                {
                    "time": "09:40",
                    "service": "Común",
                    "via": "Directo"
                },
                {
                    "time": "11:40",
                    "service": "Común",
                    "via": "Directo"
                },
                {
                    "time": "13:40",
                    "service": "Común",
                    "via": "Directo"
                },
                {
                    "time": "15:00",
                    "service": "Expreso",
                    "via": "Directo"
                },
                {
                    "time": "18:10",
                    "service": "Común",
                    "via": "Directo"
                },
                {
                    "time": "19:40",
                    "service": "Común",
                    "via": "Directo"
                }
            ]
        }
    },
    {
        "id": "tunuyan-mendoza",
        "origin": "tunuyan",
        "destination": "mendoza",
        "company": "cata",
        "line": "Recorrido Tunuyán (Terminal) - Mendoza (Terminal Capital)",
        "platform": "Plataforma 1-4",
        "estimatedPrice": "$1.500",
        "schedules": {
            "weekdays": [
                {
                    "time": "06:50",
                    "service": "Diferencial",
                    "via": "Directo"
                },
                {
                    "time": "07:00",
                    "service": "Expreso",
                    "via": "Directo"
                },
                {
                    "time": "08:00",
                    "service": "Diferencial",
                    "via": "Directo"
                },
                {
                    "time": "08:30",
                    "service": "Expreso",
                    "via": "Directo"
                },
                {
                    "time": "09:20",
                    "service": "Diferencial",
                    "via": "Directo"
                },
                {
                    "time": "10:00",
                    "service": "Expreso",
                    "via": "Directo"
                },
                {
                    "time": "12:15",
                    "service": "Diferencial",
                    "via": "Directo"
                },
                {
                    "time": "13:30",
                    "service": "Expreso",
                    "via": "Directo"
                },
                {
                    "time": "14:15",
                    "service": "Diferencial",
                    "via": "Directo"
                },
                {
                    "time": "14:50",
                    "service": "Diferencial",
                    "via": "Directo"
                },
                {
                    "time": "15:30",
                    "service": "Expreso",
                    "via": "Directo"
                },
                {
                    "time": "17:00",
                    "service": "Expreso",
                    "via": "Directo"
                },
                {
                    "time": "19:00",
                    "service": "Expreso",
                    "via": "Directo"
                },
                {
                    "time": "20:05",
                    "service": "Expreso",
                    "via": "Directo"
                },
                {
                    "time": "21:00",
                    "service": "Diferencial",
                    "via": "Directo"
                },
                {
                    "time": "22:00",
                    "service": "Expreso",
                    "via": "Directo"
                }
            ],
            "saturdays": [
                {
                    "time": "07:00",
                    "service": "Expreso",
                    "via": "Directo"
                },
                {
                    "time": "08:30",
                    "service": "Expreso",
                    "via": "Directo"
                },
                {
                    "time": "10:00",
                    "service": "Expreso",
                    "via": "Directo"
                },
                {
                    "time": "13:30",
                    "service": "Expreso",
                    "via": "Directo"
                },
                {
                    "time": "15:30",
                    "service": "Expreso",
                    "via": "Directo"
                },
                {
                    "time": "17:00",
                    "service": "Expreso",
                    "via": "Directo"
                },
                {
                    "time": "19:00",
                    "service": "Expreso",
                    "via": "Directo"
                },
                {
                    "time": "20:05",
                    "service": "Expreso",
                    "via": "Directo"
                },
                {
                    "time": "22:00",
                    "service": "Expreso",
                    "via": "Directo"
                }
            ],
            "sundays": [
                {
                    "time": "07:00",
                    "service": "Expreso",
                    "via": "Directo"
                },
                {
                    "time": "08:30",
                    "service": "Expreso",
                    "via": "Directo"
                },
                {
                    "time": "10:00",
                    "service": "Expreso",
                    "via": "Directo"
                },
                {
                    "time": "13:30",
                    "service": "Expreso",
                    "via": "Directo"
                },
                {
                    "time": "15:30",
                    "service": "Expreso",
                    "via": "Directo"
                },
                {
                    "time": "17:00",
                    "service": "Expreso",
                    "via": "Directo"
                },
                {
                    "time": "19:00",
                    "service": "Expreso",
                    "via": "Directo"
                },
                {
                    "time": "20:05",
                    "service": "Expreso",
                    "via": "Directo"
                },
                {
                    "time": "22:00",
                    "service": "Expreso",
                    "via": "Directo"
                }
            ]
        }
    },
    {
        "id": "eugeniobustos-mendoza",
        "origin": "eugeniobustos",
        "destination": "mendoza",
        "company": "cata",
        "line": "Recorrido Eugenio Bustos - Mendoza (Terminal Capital)",
        "platform": "Plataforma 1-4",
        "estimatedPrice": "$1.500",
        "schedules": {
            "weekdays": [
                {
                    "time": "10:30",
                    "service": "Expreso",
                    "via": "BUSTOS"
                },
                {
                    "time": "12:50",
                    "service": "Expreso",
                    "via": "BUSTOS"
                },
                {
                    "time": "17:30",
                    "service": "Expreso",
                    "via": "BUSTOS"
                },
                {
                    "time": "18:05",
                    "service": "Diferencial",
                    "via": "BUSTOS"
                },
                {
                    "time": "19:50",
                    "service": "Expreso",
                    "via": "BUSTOS"
                },
                {
                    "time": "21:30",
                    "service": "Expreso",
                    "via": "BUSTOS"
                }
            ],
            "saturdays": [
                {
                    "time": "10:30",
                    "service": "Expreso",
                    "via": "BUSTOS"
                },
                {
                    "time": "12:50",
                    "service": "Expreso",
                    "via": "BUSTOS"
                },
                {
                    "time": "17:30",
                    "service": "Expreso",
                    "via": "BUSTOS"
                },
                {
                    "time": "19:50",
                    "service": "Expreso",
                    "via": "BUSTOS"
                },
                {
                    "time": "21:30",
                    "service": "Expreso",
                    "via": "BUSTOS"
                }
            ],
            "sundays": [
                {
                    "time": "10:30",
                    "service": "Expreso",
                    "via": "BUSTOS"
                },
                {
                    "time": "12:50",
                    "service": "Expreso",
                    "via": "BUSTOS"
                },
                {
                    "time": "17:30",
                    "service": "Expreso",
                    "via": "BUSTOS"
                },
                {
                    "time": "19:50",
                    "service": "Expreso",
                    "via": "BUSTOS"
                },
                {
                    "time": "21:30",
                    "service": "Expreso",
                    "via": "BUSTOS"
                }
            ]
        }
    },
    {
        "id": "tunuyan-vistaflores",
        "origin": "tunuyan",
        "destination": "vistaflores",
        "company": "cata",
        "line": "Recorrido Tunuyán (Terminal) - Vista Flores",
        "platform": "Plataforma 1-4",
        "estimatedPrice": "$1.500",
        "schedules": {
            "weekdays": [
                {
                    "time": "05:30",
                    "service": "Común",
                    "via": "Directo"
                },
                {
                    "time": "07:20",
                    "service": "Común",
                    "via": "Directo"
                },
                {
                    "time": "07:21",
                    "service": "Común",
                    "via": "Directo"
                },
                {
                    "time": "07:25",
                    "service": "Común",
                    "via": "Directo"
                },
                {
                    "time": "08:00",
                    "service": "Común",
                    "via": "Directo"
                },
                {
                    "time": "09:30",
                    "service": "Común",
                    "via": "Directo"
                },
                {
                    "time": "11:25",
                    "service": "Común",
                    "via": "Directo"
                },
                {
                    "time": "12:50",
                    "service": "Común",
                    "via": "Directo"
                },
                {
                    "time": "12:51",
                    "service": "Común",
                    "via": "Directo"
                },
                {
                    "time": "17:10",
                    "service": "Común",
                    "via": "Directo"
                },
                {
                    "time": "17:25",
                    "service": "Común",
                    "via": "Directo"
                },
                {
                    "time": "17:45",
                    "service": "Común",
                    "via": "Directo"
                },
                {
                    "time": "18:45",
                    "service": "Común",
                    "via": "Directo"
                }
            ],
            "saturdays": [
                {
                    "time": "07:30",
                    "service": "Común",
                    "via": "Directo"
                },
                {
                    "time": "08:00",
                    "service": "Común",
                    "via": "Directo"
                },
                {
                    "time": "10:30",
                    "service": "Común",
                    "via": "Directo"
                },
                {
                    "time": "12:15",
                    "service": "Común",
                    "via": "Directo"
                },
                {
                    "time": "14:30",
                    "service": "Común",
                    "via": "Directo"
                },
                {
                    "time": "15:50",
                    "service": "Común",
                    "via": "Directo"
                },
                {
                    "time": "16:50",
                    "service": "Común",
                    "via": "Directo"
                },
                {
                    "time": "17:25",
                    "service": "Común",
                    "via": "Directo"
                },
                {
                    "time": "21:30",
                    "service": "Común",
                    "via": "Directo"
                },
                {
                    "time": "22:55",
                    "service": "Común",
                    "via": "Directo"
                }
            ],
            "sundays": [
                {
                    "time": "10:30",
                    "service": "Común",
                    "via": "Directo"
                },
                {
                    "time": "12:15",
                    "service": "Común",
                    "via": "Directo"
                },
                {
                    "time": "17:25",
                    "service": "Común",
                    "via": "Directo"
                },
                {
                    "time": "21:30",
                    "service": "Común",
                    "via": "Directo"
                },
                {
                    "time": "22:55",
                    "service": "Común",
                    "via": "Directo"
                }
            ]
        }
    },
    {
        "id": "tunuyan-losarboles",
        "origin": "tunuyan",
        "destination": "losarboles",
        "company": "cata",
        "line": "Recorrido Tunuyán (Terminal) - Los Árboles",
        "platform": "Plataforma 1-4",
        "estimatedPrice": "$1.500",
        "schedules": {
            "weekdays": [
                {
                    "time": "05:30",
                    "service": "Común",
                    "via": "Directo"
                },
                {
                    "time": "13:30",
                    "service": "Común",
                    "via": "Directo"
                },
                {
                    "time": "20:00",
                    "service": "Común",
                    "via": "Directo"
                }
            ],
            "saturdays": [
                {
                    "time": "13:30",
                    "service": "Común",
                    "via": "Directo"
                },
                {
                    "time": "20:00",
                    "service": "Común",
                    "via": "Directo"
                }
            ],
            "sundays": [
                {
                    "time": "13:30",
                    "service": "Común",
                    "via": "Directo"
                },
                {
                    "time": "20:00",
                    "service": "Común",
                    "via": "Directo"
                }
            ]
        }
    },
    {
        "id": "tunuyan-laconsulta",
        "origin": "tunuyan",
        "destination": "laconsulta",
        "company": "cata",
        "line": "Recorrido Tunuyán (Terminal) - La Consulta",
        "platform": "Plataforma 1-4",
        "estimatedPrice": "$1.500",
        "schedules": {
            "weekdays": [
                {
                    "time": "05:50",
                    "service": "Común",
                    "via": "vía V. FLORES"
                },
                {
                    "time": "06:45",
                    "service": "Común",
                    "via": "vía V. FLORES"
                },
                {
                    "time": "08:30",
                    "service": "Común",
                    "via": "vía V. FLORES"
                },
                {
                    "time": "11:30",
                    "service": "Común",
                    "via": "vía V. FLORES"
                },
                {
                    "time": "15:01",
                    "service": "Común",
                    "via": "vía RN 40"
                },
                {
                    "time": "15:50",
                    "service": "Común",
                    "via": "vía V. FLORES"
                },
                {
                    "time": "16:00",
                    "service": "Común",
                    "via": "vía RN 40"
                },
                {
                    "time": "16:20",
                    "service": "Común",
                    "via": "vía V. FLORES"
                },
                {
                    "time": "18:00",
                    "service": "Común",
                    "via": "vía RN 40"
                },
                {
                    "time": "20:00",
                    "service": "Común",
                    "via": "vía V. FLORES"
                },
                {
                    "time": "21:55",
                    "service": "Común",
                    "via": "vía V. FLORES"
                },
                {
                    "time": "22:30",
                    "service": "Común",
                    "via": "vía V. FLORES"
                }
            ],
            "saturdays": [
                {
                    "time": "11:30",
                    "service": "Común",
                    "via": "vía V. FLORES"
                },
                {
                    "time": "18:50",
                    "service": "Común",
                    "via": "vía RN 40"
                },
                {
                    "time": "20:00",
                    "service": "Común",
                    "via": "vía V. FLORES"
                }
            ],
            "sundays": [
                {
                    "time": "07:30",
                    "service": "Común",
                    "via": "vía V. FLORES"
                },
                {
                    "time": "08:30",
                    "service": "Común",
                    "via": "vía RN 40"
                },
                {
                    "time": "19:20",
                    "service": "Común",
                    "via": "vía RN 40"
                },
                {
                    "time": "20:00",
                    "service": "Común",
                    "via": "vía V. FLORES"
                }
            ]
        }
    },
    {
        "id": "tunuyan-barbero",
        "origin": "tunuyan",
        "destination": "barbero",
        "company": "cata",
        "line": "Recorrido Tunuyán (Terminal) - Barbero",
        "platform": "Plataforma 1-4",
        "estimatedPrice": "$1.500",
        "schedules": {
            "weekdays": [
                {
                    "time": "06:00",
                    "service": "Común",
                    "via": "Directo"
                }
            ],
            "saturdays": [],
            "sundays": []
        }
    },
    {
        "id": "tunuyan-pareditas",
        "origin": "tunuyan",
        "destination": "pareditas",
        "company": "cata",
        "line": "Recorrido Tunuyán (Terminal) - Pareditas",
        "platform": "Plataforma 1-4",
        "estimatedPrice": "$1.500",
        "schedules": {
            "weekdays": [
                {
                    "time": "06:00",
                    "service": "Común",
                    "via": "vía CONSULTA"
                },
                {
                    "time": "07:30",
                    "service": "Común",
                    "via": "vía CONSULTA"
                },
                {
                    "time": "09:00",
                    "service": "Común",
                    "via": "vía CONSULTA"
                },
                {
                    "time": "10:10",
                    "service": "Común",
                    "via": "vía CONSULTA"
                },
                {
                    "time": "11:15",
                    "service": "Común",
                    "via": "vía CONSULTA"
                },
                {
                    "time": "12:10",
                    "service": "Común",
                    "via": "vía CONSULTA"
                },
                {
                    "time": "12:40",
                    "service": "Común",
                    "via": "vía CONSULTA"
                },
                {
                    "time": "17:00",
                    "service": "Común",
                    "via": "vía CONSULTA"
                },
                {
                    "time": "18:00",
                    "service": "Común",
                    "via": "vía V. FLORES"
                },
                {
                    "time": "19:20",
                    "service": "Común",
                    "via": "vía CONSULTA"
                },
                {
                    "time": "20:30",
                    "service": "Común",
                    "via": "vía CONSULTA"
                },
                {
                    "time": "23:40",
                    "service": "Común",
                    "via": "vía CONSULTA"
                }
            ],
            "saturdays": [
                {
                    "time": "06:00",
                    "service": "Común",
                    "via": "vía CONSULTA"
                },
                {
                    "time": "10:10",
                    "service": "Común",
                    "via": "vía CONSULTA"
                },
                {
                    "time": "11:15",
                    "service": "Común",
                    "via": "vía CONSULTA"
                },
                {
                    "time": "12:40",
                    "service": "Común",
                    "via": "vía CONSULTA"
                },
                {
                    "time": "17:00",
                    "service": "Común",
                    "via": "vía CONSULTA"
                },
                {
                    "time": "18:00",
                    "service": "Común",
                    "via": "vía V. FLORES"
                },
                {
                    "time": "19:20",
                    "service": "Común",
                    "via": "vía CONSULTA"
                },
                {
                    "time": "20:30",
                    "service": "Común",
                    "via": "vía CONSULTA"
                }
            ],
            "sundays": [
                {
                    "time": "06:00",
                    "service": "Común",
                    "via": "vía CONSULTA"
                },
                {
                    "time": "12:40",
                    "service": "Común",
                    "via": "vía CONSULTA"
                },
                {
                    "time": "17:00",
                    "service": "Común",
                    "via": "vía CONSULTA"
                },
                {
                    "time": "18:00",
                    "service": "Común",
                    "via": "vía V. FLORES"
                },
                {
                    "time": "20:30",
                    "service": "Común",
                    "via": "vía CONSULTA"
                }
            ]
        }
    },
    {
        "id": "tunuyan-eugeniobustos",
        "origin": "tunuyan",
        "destination": "eugeniobustos",
        "company": "cata",
        "line": "Recorrido Tunuyán (Terminal) - Eugenio Bustos",
        "platform": "Plataforma 1-4",
        "estimatedPrice": "$1.500",
        "schedules": {
            "weekdays": [
                {
                    "time": "06:00",
                    "service": "Común",
                    "via": "vía CONSULTA"
                },
                {
                    "time": "07:31",
                    "service": "Común",
                    "via": "vía CONSULTA"
                },
                {
                    "time": "08:30",
                    "service": "Común",
                    "via": "vía CONSULTA"
                },
                {
                    "time": "09:50",
                    "service": "Común",
                    "via": "vía V. FLORES"
                },
                {
                    "time": "10:30",
                    "service": "Común",
                    "via": "vía V. FLORES"
                },
                {
                    "time": "11:00",
                    "service": "Común",
                    "via": "vía CONSULTA"
                },
                {
                    "time": "12:11",
                    "service": "Común",
                    "via": "vía CONSULTA"
                },
                {
                    "time": "13:20",
                    "service": "Común",
                    "via": "vía RN 40"
                },
                {
                    "time": "14:00",
                    "service": "Común",
                    "via": "vía V. FLORES"
                },
                {
                    "time": "15:00",
                    "service": "Común",
                    "via": "vía CONSULTA"
                },
                {
                    "time": "16:30",
                    "service": "Común",
                    "via": "vía V. FLORES"
                },
                {
                    "time": "21:50",
                    "service": "Común",
                    "via": "vía CONSULTA"
                }
            ],
            "saturdays": [
                {
                    "time": "08:30",
                    "service": "Común",
                    "via": "vía CONSULTA"
                },
                {
                    "time": "09:50",
                    "service": "Común",
                    "via": "vía V. FLORES"
                },
                {
                    "time": "14:00",
                    "service": "Común",
                    "via": "vía V. FLORES"
                },
                {
                    "time": "15:00",
                    "service": "Común",
                    "via": "vía RN 40"
                },
                {
                    "time": "15:50",
                    "service": "Común",
                    "via": "vía RN 40"
                },
                {
                    "time": "16:30",
                    "service": "Común",
                    "via": "vía V. FLORES"
                },
                {
                    "time": "17:00",
                    "service": "Común",
                    "via": "vía RN 40"
                },
                {
                    "time": "19:20",
                    "service": "Común",
                    "via": "vía RN 40"
                },
                {
                    "time": "20:30",
                    "service": "Común",
                    "via": "vía CAPIZ"
                },
                {
                    "time": "21:50",
                    "service": "Común",
                    "via": "vía CONSULTA"
                }
            ],
            "sundays": [
                {
                    "time": "09:50",
                    "service": "Común",
                    "via": "vía CONSULTA"
                },
                {
                    "time": "14:00",
                    "service": "Común",
                    "via": "vía V. FLORES"
                },
                {
                    "time": "15:00",
                    "service": "Común",
                    "via": "vía CONSULTA"
                },
                {
                    "time": "16:30",
                    "service": "Común",
                    "via": "vía V. FLORES"
                },
                {
                    "time": "21:50",
                    "service": "Común",
                    "via": "vía CONSULTA"
                }
            ]
        }
    },
    {
        "id": "tunuyan-laspintadas",
        "origin": "tunuyan",
        "destination": "laspintadas",
        "company": "cata",
        "line": "Recorrido Tunuyán (Terminal) - Las Pintadas",
        "platform": "Plataforma 1-4",
        "estimatedPrice": "$1.500",
        "schedules": {
            "weekdays": [
                {
                    "time": "06:20",
                    "service": "Común",
                    "via": "Directo"
                },
                {
                    "time": "13:25",
                    "service": "Común",
                    "via": "Directo"
                },
                {
                    "time": "15:40",
                    "service": "Común",
                    "via": "Directo"
                },
                {
                    "time": "20:30",
                    "service": "Común",
                    "via": "Directo"
                }
            ],
            "saturdays": [
                {
                    "time": "06:20",
                    "service": "Común",
                    "via": "Directo"
                },
                {
                    "time": "13:25",
                    "service": "Común",
                    "via": "Directo"
                },
                {
                    "time": "15:40",
                    "service": "Común",
                    "via": "Directo"
                },
                {
                    "time": "20:30",
                    "service": "Común",
                    "via": "Directo"
                }
            ],
            "sundays": []
        }
    },
    {
        "id": "tunuyan-chilecito",
        "origin": "tunuyan",
        "destination": "chilecito",
        "company": "cata",
        "line": "Recorrido Tunuyán (Terminal) - Chilecito",
        "platform": "Plataforma 1-4",
        "estimatedPrice": "$1.500",
        "schedules": {
            "weekdays": [
                {
                    "time": "06:30",
                    "service": "Común",
                    "via": "vía CHACON"
                }
            ],
            "saturdays": [],
            "sundays": []
        }
    },
    {
        "id": "tunuyan-manzano",
        "origin": "tunuyan",
        "destination": "manzano",
        "company": "cata",
        "line": "Recorrido Tunuyán (Terminal) - Manzano Histórico",
        "platform": "Plataforma 1-4",
        "estimatedPrice": "$1.500",
        "schedules": {
            "weekdays": [
                {
                    "time": "07:00",
                    "service": "Común",
                    "via": "Directo"
                },
                {
                    "time": "11:00",
                    "service": "Común",
                    "via": "Directo"
                }
            ],
            "saturdays": [
                {
                    "time": "09:30",
                    "service": "Común",
                    "via": "Directo"
                },
                {
                    "time": "15:30",
                    "service": "Común",
                    "via": "Directo"
                }
            ],
            "sundays": [
                {
                    "time": "09:30",
                    "service": "Común",
                    "via": "Directo"
                },
                {
                    "time": "15:30",
                    "service": "Común",
                    "via": "Directo"
                }
            ]
        }
    },
    {
        "id": "tunuyan-laprimavera",
        "origin": "tunuyan",
        "destination": "laprimavera",
        "company": "cata",
        "line": "Recorrido Tunuyán (Terminal) - La Primavera",
        "platform": "Plataforma 1-4",
        "estimatedPrice": "$1.500",
        "schedules": {
            "weekdays": [
                {
                    "time": "07:40",
                    "service": "Común",
                    "via": "Directo"
                },
                {
                    "time": "12:25",
                    "service": "Común",
                    "via": "Directo"
                }
            ],
            "saturdays": [
                {
                    "time": "13:20",
                    "service": "Común",
                    "via": "Directo"
                }
            ],
            "sundays": []
        }
    },
    {
        "id": "tunuyan-campolosandes",
        "origin": "tunuyan",
        "destination": "campolosandes",
        "company": "cata",
        "line": "Recorrido Tunuyán (Terminal) - Campo de los Andes",
        "platform": "Plataforma 1-4",
        "estimatedPrice": "$1.500",
        "schedules": {
            "weekdays": [
                {
                    "time": "12:30",
                    "service": "Común",
                    "via": "vía V. FLORES"
                },
                {
                    "time": "17:10",
                    "service": "Común",
                    "via": "vía V. FLORES"
                }
            ],
            "saturdays": [],
            "sundays": []
        }
    },
    {
        "id": "eugeniobustos-laconsulta",
        "origin": "eugeniobustos",
        "destination": "laconsulta",
        "company": "cata",
        "line": "Recorrido Eugenio Bustos - La Consulta",
        "platform": "Plataforma 1-4",
        "estimatedPrice": "$1.500",
        "schedules": {
            "weekdays": [
                {
                    "time": "07:25",
                    "service": "Común",
                    "via": "vía SAN CARLOS"
                },
                {
                    "time": "08:30",
                    "service": "Común",
                    "via": "vía SAN CARLOS"
                }
            ],
            "saturdays": [
                {
                    "time": "21:00",
                    "service": "Común",
                    "via": "vía SAN CARLOS"
                }
            ],
            "sundays": []
        }
    },
    {
        "id": "eugeniobustos-tunuyan",
        "origin": "eugeniobustos",
        "destination": "tunuyan",
        "company": "cata",
        "line": "Recorrido Eugenio Bustos - Tunuyán (Terminal)",
        "platform": "Plataforma 1-4",
        "estimatedPrice": "$1.500",
        "schedules": {
            "weekdays": [
                {
                    "time": "10:25",
                    "service": "Común",
                    "via": "vía LA CONSULTA"
                },
                {
                    "time": "11:20",
                    "service": "Común",
                    "via": "vía V. FLORES"
                },
                {
                    "time": "12:15",
                    "service": "Común",
                    "via": "vía LA CONSULTA"
                },
                {
                    "time": "13:30",
                    "service": "Común",
                    "via": "vía LA CONSULTA"
                },
                {
                    "time": "14:00",
                    "service": "Común",
                    "via": "vía RN 40"
                },
                {
                    "time": "14:20",
                    "service": "Común",
                    "via": "vía RN 40"
                },
                {
                    "time": "15:30",
                    "service": "Común",
                    "via": "vía V. FLORES"
                },
                {
                    "time": "16:20",
                    "service": "Común",
                    "via": "vía LA CONSULTA"
                },
                {
                    "time": "18:10",
                    "service": "Común",
                    "via": "vía V. FLORES"
                },
                {
                    "time": "19:30",
                    "service": "Común",
                    "via": "vía V. FLORES"
                },
                {
                    "time": "23:00",
                    "service": "Común",
                    "via": "vía LA CONSULTA"
                }
            ],
            "saturdays": [
                {
                    "time": "10:25",
                    "service": "Común",
                    "via": "vía LA CONSULTA"
                },
                {
                    "time": "11:20",
                    "service": "Común",
                    "via": "vía V. FLORES"
                },
                {
                    "time": "15:30",
                    "service": "Común",
                    "via": "vía V. FLORES"
                },
                {
                    "time": "16:05",
                    "service": "Común",
                    "via": "vía CAPIZ"
                },
                {
                    "time": "16:20",
                    "service": "Común",
                    "via": "vía LA CONSULTA"
                },
                {
                    "time": "17:30",
                    "service": "Común",
                    "via": "vía RN 40"
                },
                {
                    "time": "18:10",
                    "service": "Común",
                    "via": "vía V. FLORES"
                },
                {
                    "time": "23:00",
                    "service": "Común",
                    "via": "vía LA CONSULTA"
                }
            ],
            "sundays": [
                {
                    "time": "15:30",
                    "service": "Común",
                    "via": "vía V. FLORES"
                },
                {
                    "time": "16:20",
                    "service": "Común",
                    "via": "vía LA CONSULTA"
                },
                {
                    "time": "18:10",
                    "service": "Común",
                    "via": "vía V. FLORES"
                },
                {
                    "time": "23:00",
                    "service": "Común",
                    "via": "vía LA CONSULTA"
                }
            ]
        }
    },
    {
        "id": "laconsulta-tunuyan",
        "origin": "laconsulta",
        "destination": "tunuyan",
        "company": "cata",
        "line": "Recorrido La Consulta - Tunuyán (Terminal)",
        "platform": "Plataforma 1-4",
        "estimatedPrice": "$1.500",
        "schedules": {
            "weekdays": [
                {
                    "time": "06:30",
                    "service": "Común",
                    "via": "vía V. FLORES"
                },
                {
                    "time": "06:50",
                    "service": "Común",
                    "via": "vía V. FLORES"
                },
                {
                    "time": "08:00",
                    "service": "Común",
                    "via": "vía V. FLORES"
                },
                {
                    "time": "09:30",
                    "service": "Común",
                    "via": "vía V. FLORES"
                },
                {
                    "time": "12:50",
                    "service": "Común",
                    "via": "vía V. FLORES"
                },
                {
                    "time": "15:50",
                    "service": "Común",
                    "via": "vía V. FLORES"
                },
                {
                    "time": "16:50",
                    "service": "Común",
                    "via": "vía V. FLORES"
                },
                {
                    "time": "17:40",
                    "service": "Común",
                    "via": "vía RN 40"
                },
                {
                    "time": "18:30",
                    "service": "Común",
                    "via": "vía CNEL VIDELA"
                },
                {
                    "time": "21:10",
                    "service": "Común",
                    "via": "vía V. FLORES"
                },
                {
                    "time": "22:50",
                    "service": "Común",
                    "via": "vía V. FLORES"
                }
            ],
            "saturdays": [
                {
                    "time": "09:30",
                    "service": "Común",
                    "via": "vía V. FLORES"
                },
                {
                    "time": "12:50",
                    "service": "Común",
                    "via": "vía V. FLORES"
                },
                {
                    "time": "20:00",
                    "service": "Común",
                    "via": "vía V. FLORES"
                },
                {
                    "time": "21:00",
                    "service": "Común",
                    "via": "vía V. FLORES"
                }
            ],
            "sundays": [
                {
                    "time": "08:30",
                    "service": "Común",
                    "via": "vía V. FLORES"
                },
                {
                    "time": "20:00",
                    "service": "Común",
                    "via": "vía V. FLORES"
                },
                {
                    "time": "21:10",
                    "service": "Común",
                    "via": "vía V. FLORES"
                }
            ]
        }
    },
    {
        "id": "laconsulta-eugeniobustos",
        "origin": "laconsulta",
        "destination": "eugeniobustos",
        "company": "cata",
        "line": "Recorrido La Consulta - Eugenio Bustos",
        "platform": "Plataforma 1-4",
        "estimatedPrice": "$1.500",
        "schedules": {
            "weekdays": [
                {
                    "time": "09:00",
                    "service": "Común",
                    "via": "vía SAN CARLOS"
                }
            ],
            "saturdays": [],
            "sundays": []
        }
    },
    {
        "id": "vistaflores-tunuyan",
        "origin": "vistaflores",
        "destination": "tunuyan",
        "company": "cata",
        "line": "Recorrido Vista Flores - Tunuyán (Terminal)",
        "platform": "Plataforma 1-4",
        "estimatedPrice": "$1.500",
        "schedules": {
            "weekdays": [
                {
                    "time": "06:00",
                    "service": "Común",
                    "via": "vía RP 92"
                },
                {
                    "time": "07:50",
                    "service": "Común",
                    "via": "vía LOS SAUCES"
                },
                {
                    "time": "08:00",
                    "service": "Común",
                    "via": "vía RP 92"
                },
                {
                    "time": "08:01",
                    "service": "Común",
                    "via": "vía RP 92"
                },
                {
                    "time": "09:20",
                    "service": "Común",
                    "via": "vía RP 92"
                },
                {
                    "time": "10:30",
                    "service": "Común",
                    "via": "vía RP 92"
                },
                {
                    "time": "12:20",
                    "service": "Común",
                    "via": "vía RP 92"
                },
                {
                    "time": "13:25",
                    "service": "Común",
                    "via": "vía RP 92"
                },
                {
                    "time": "14:30",
                    "service": "Común",
                    "via": "vía RP 92"
                },
                {
                    "time": "18:00",
                    "service": "Común",
                    "via": "vía RP 92"
                },
                {
                    "time": "18:20",
                    "service": "Común",
                    "via": "vía RP 92"
                },
                {
                    "time": "19:20",
                    "service": "Común",
                    "via": "vía RP 92"
                }
            ],
            "saturdays": [
                {
                    "time": "08:00",
                    "service": "Común",
                    "via": "vía RP 92"
                },
                {
                    "time": "09:00",
                    "service": "Común",
                    "via": "vía RP 92"
                },
                {
                    "time": "11:00",
                    "service": "Común",
                    "via": "vía RP 92"
                },
                {
                    "time": "12:50",
                    "service": "Común",
                    "via": "vía RP 92"
                },
                {
                    "time": "13:20",
                    "service": "Común",
                    "via": "vía RP 92"
                },
                {
                    "time": "15:10",
                    "service": "Común",
                    "via": "vía RP 92"
                },
                {
                    "time": "16:30",
                    "service": "Común",
                    "via": "vía RP 92"
                },
                {
                    "time": "17:20",
                    "service": "Común",
                    "via": "vía RP 92"
                },
                {
                    "time": "18:20",
                    "service": "Común",
                    "via": "vía RP 92"
                },
                {
                    "time": "22:00",
                    "service": "Común",
                    "via": "vía RP 92"
                },
                {
                    "time": "23:30",
                    "service": "Común",
                    "via": "vía RP 92"
                }
            ],
            "sundays": [
                {
                    "time": "11:00",
                    "service": "Común",
                    "via": "vía RP 92"
                },
                {
                    "time": "18:20",
                    "service": "Común",
                    "via": "vía RP 92"
                },
                {
                    "time": "22:00",
                    "service": "Común",
                    "via": "vía RP 92"
                },
                {
                    "time": "23:30",
                    "service": "Común",
                    "via": "vía RP 92"
                }
            ]
        }
    },
    {
        "id": "pareditas-tunuyan",
        "origin": "pareditas",
        "destination": "tunuyan",
        "company": "cata",
        "line": "Recorrido Pareditas - Tunuyán (Terminal)",
        "platform": "Plataforma 1-4",
        "estimatedPrice": "$1.500",
        "schedules": {
            "weekdays": [
                {
                    "time": "05:40",
                    "service": "Común",
                    "via": "x CONSULTA"
                },
                {
                    "time": "06:20",
                    "service": "Común",
                    "via": "x CONSULTA"
                },
                {
                    "time": "06:45",
                    "service": "Común",
                    "via": "x VISTA FLORES"
                },
                {
                    "time": "08:05",
                    "service": "Común",
                    "via": "x CONSULTA"
                },
                {
                    "time": "09:40",
                    "service": "Común",
                    "via": "x CONSULTA"
                },
                {
                    "time": "12:10",
                    "service": "Común",
                    "via": "x CONSULTA"
                },
                {
                    "time": "13:30",
                    "service": "Común",
                    "via": "x CONSULTA"
                },
                {
                    "time": "14:40",
                    "service": "Común",
                    "via": "x CONSULTA"
                },
                {
                    "time": "15:40",
                    "service": "Común",
                    "via": "x SAN CARLOS"
                },
                {
                    "time": "17:00",
                    "service": "Común",
                    "via": "x CONSULTA"
                },
                {
                    "time": "19:15",
                    "service": "Común",
                    "via": "x CONSULTA"
                },
                {
                    "time": "21:30",
                    "service": "Común",
                    "via": "x SAN CARLOS"
                }
            ],
            "saturdays": [
                {
                    "time": "06:45",
                    "service": "Común",
                    "via": "x VISTA FLORES"
                },
                {
                    "time": "07:40",
                    "service": "Común",
                    "via": "x CHACON"
                },
                {
                    "time": "12:10",
                    "service": "Común",
                    "via": "x CONSULTA"
                },
                {
                    "time": "15:40",
                    "service": "Común",
                    "via": "x CONSULTA"
                },
                {
                    "time": "17:00",
                    "service": "Común",
                    "via": "x CONSULTA"
                },
                {
                    "time": "18:10",
                    "service": "Común",
                    "via": "x CHACON"
                },
                {
                    "time": "21:30",
                    "service": "Común",
                    "via": "x SAN CARLOS"
                }
            ],
            "sundays": [
                {
                    "time": "06:45",
                    "service": "Común",
                    "via": "x VISTA FLORES"
                },
                {
                    "time": "12:10",
                    "service": "Común",
                    "via": "x CONSULTA"
                },
                {
                    "time": "17:00",
                    "service": "Común",
                    "via": "x CONSULTA"
                },
                {
                    "time": "21:30",
                    "service": "Común",
                    "via": "x SAN CARLOS"
                }
            ]
        }
    },
    {
        "id": "pareditas-eugeniobustos",
        "origin": "pareditas",
        "destination": "eugeniobustos",
        "company": "cata",
        "line": "Recorrido Pareditas - Eugenio Bustos",
        "platform": "Plataforma 1-4",
        "estimatedPrice": "$1.500",
        "schedules": {
            "weekdays": [
                {
                    "time": "12:05",
                    "service": "Común",
                    "via": "Directo"
                }
            ],
            "saturdays": [
                {
                    "time": "17:00",
                    "service": "Común",
                    "via": "Directo"
                }
            ],
            "sundays": []
        }
    },
    {
        "id": "mendoza-tupungato",
        "origin": "mendoza",
        "destination": "tupungato",
        "company": "mitre",
        "line": "Recorrido Mendoza (Terminal Capital) - Tupungato (Terminal)",
        "platform": "Plataforma 1-4",
        "estimatedPrice": "$1.500",
        "schedules": {
            "weekdays": [
                {
                    "time": "06:30",
                    "service": "Expreso",
                    "via": "Directo"
                },
                {
                    "time": "07:00",
                    "service": "Expreso",
                    "via": "Directo"
                },
                {
                    "time": "07:30",
                    "service": "Expreso",
                    "via": "Directo"
                },
                {
                    "time": "08:30",
                    "service": "Común",
                    "via": "Directo"
                },
                {
                    "time": "09:15",
                    "service": "Diferencial",
                    "via": "Directo"
                },
                {
                    "time": "10:00",
                    "service": "Expreso",
                    "via": "Directo"
                },
                {
                    "time": "11:25",
                    "service": "Expreso",
                    "via": "Directo"
                },
                {
                    "time": "11:30",
                    "service": "Común",
                    "via": "Directo"
                },
                {
                    "time": "12:30",
                    "service": "Expreso",
                    "via": "Directo"
                },
                {
                    "time": "13:00",
                    "service": "Diferencial",
                    "via": "Directo"
                },
                {
                    "time": "14:00",
                    "service": "Expreso",
                    "via": "Directo"
                },
                {
                    "time": "15:30",
                    "service": "Expreso",
                    "via": "Directo"
                },
                {
                    "time": "16:00",
                    "service": "Diferencial",
                    "via": "Directo"
                },
                {
                    "time": "17:30",
                    "service": "Común",
                    "via": "Directo"
                },
                {
                    "time": "18:30",
                    "service": "Expreso",
                    "via": "Directo"
                },
                {
                    "time": "19:00",
                    "service": "Diferencial",
                    "via": "Directo"
                },
                {
                    "time": "20:00",
                    "service": "Expreso",
                    "via": "Directo"
                },
                {
                    "time": "21:00",
                    "service": "Común",
                    "via": "Directo"
                },
                {
                    "time": "22:00",
                    "service": "Expreso",
                    "via": "Directo"
                }
            ],
            "saturdays": [
                {
                    "time": "06:30",
                    "service": "Expreso",
                    "via": "Directo"
                },
                {
                    "time": "07:15",
                    "service": "Expreso",
                    "via": "Directo"
                },
                {
                    "time": "08:30",
                    "service": "Común",
                    "via": "Directo"
                },
                {
                    "time": "09:15",
                    "service": "Diferencial",
                    "via": "Directo"
                },
                {
                    "time": "10:00",
                    "service": "Expreso",
                    "via": "Directo"
                },
                {
                    "time": "11:30",
                    "service": "Común",
                    "via": "Directo"
                },
                {
                    "time": "12:30",
                    "service": "Expreso",
                    "via": "Directo"
                },
                {
                    "time": "13:00",
                    "service": "Diferencial",
                    "via": "Directo"
                },
                {
                    "time": "14:00",
                    "service": "Expreso",
                    "via": "Directo"
                },
                {
                    "time": "15:30",
                    "service": "Expreso",
                    "via": "Directo"
                },
                {
                    "time": "16:00",
                    "service": "Diferencial",
                    "via": "Directo"
                },
                {
                    "time": "17:30",
                    "service": "Común",
                    "via": "Directo"
                },
                {
                    "time": "18:30",
                    "service": "Expreso",
                    "via": "Directo"
                },
                {
                    "time": "19:00",
                    "service": "Diferencial",
                    "via": "Directo"
                },
                {
                    "time": "20:00",
                    "service": "Expreso",
                    "via": "Directo"
                },
                {
                    "time": "21:00",
                    "service": "Común",
                    "via": "Directo"
                },
                {
                    "time": "22:00",
                    "service": "Expreso",
                    "via": "Directo"
                }
            ],
            "sundays": [
                {
                    "time": "06:30",
                    "service": "Expreso",
                    "via": "Directo"
                },
                {
                    "time": "07:15",
                    "service": "Expreso",
                    "via": "Directo"
                },
                {
                    "time": "08:30",
                    "service": "Común",
                    "via": "Directo"
                },
                {
                    "time": "10:00",
                    "service": "Expreso",
                    "via": "Directo"
                },
                {
                    "time": "11:30",
                    "service": "Común",
                    "via": "Directo"
                },
                {
                    "time": "12:30",
                    "service": "Expreso",
                    "via": "Directo"
                },
                {
                    "time": "14:00",
                    "service": "Expreso",
                    "via": "Directo"
                },
                {
                    "time": "15:30",
                    "service": "Expreso",
                    "via": "Directo"
                },
                {
                    "time": "17:30",
                    "service": "Común",
                    "via": "Directo"
                },
                {
                    "time": "18:30",
                    "service": "Expreso",
                    "via": "Directo"
                },
                {
                    "time": "20:00",
                    "service": "Expreso",
                    "via": "Directo"
                },
                {
                    "time": "21:00",
                    "service": "Común",
                    "via": "Directo"
                },
                {
                    "time": "22:00",
                    "service": "Expreso",
                    "via": "Directo"
                }
            ]
        }
    },
    {
        "id": "tupungato-mendoza",
        "origin": "tupungato",
        "destination": "mendoza",
        "company": "mitre",
        "line": "Recorrido Tupungato (Terminal) - Mendoza (Terminal Capital)",
        "platform": "Plataforma 1-4",
        "estimatedPrice": "$1.500",
        "schedules": {
            "weekdays": [
                {
                    "time": "05:15",
                    "service": "Común",
                    "via": "Directo"
                },
                {
                    "time": "06:30",
                    "service": "Expreso",
                    "via": "Directo"
                },
                {
                    "time": "06:31",
                    "service": "Expreso",
                    "via": "Directo"
                },
                {
                    "time": "07:30",
                    "service": "Diferencial",
                    "via": "Directo"
                },
                {
                    "time": "08:00",
                    "service": "Común",
                    "via": "Directo"
                },
                {
                    "time": "09:30",
                    "service": "Expreso",
                    "via": "Directo"
                },
                {
                    "time": "09:31",
                    "service": "Expreso",
                    "via": "Directo"
                },
                {
                    "time": "11:00",
                    "service": "Diferencial",
                    "via": "Directo"
                },
                {
                    "time": "11:30",
                    "service": "Común",
                    "via": "Directo"
                },
                {
                    "time": "13:00",
                    "service": "Expreso",
                    "via": "Directo"
                },
                {
                    "time": "13:01",
                    "service": "Expreso",
                    "via": "Directo"
                },
                {
                    "time": "14:00",
                    "service": "Común",
                    "via": "Directo"
                },
                {
                    "time": "14:30",
                    "service": "Diferencial",
                    "via": "Directo"
                },
                {
                    "time": "15:30",
                    "service": "Expreso",
                    "via": "Directo"
                },
                {
                    "time": "17:00",
                    "service": "Expreso",
                    "via": "Directo"
                },
                {
                    "time": "17:30",
                    "service": "Diferencial",
                    "via": "Directo"
                },
                {
                    "time": "18:30",
                    "service": "Expreso",
                    "via": "Directo"
                },
                {
                    "time": "20:00",
                    "service": "Expreso",
                    "via": "Directo"
                },
                {
                    "time": "21:30",
                    "service": "Común",
                    "via": "Directo"
                }
            ],
            "saturdays": [
                {
                    "time": "05:15",
                    "service": "Común",
                    "via": "Directo"
                },
                {
                    "time": "06:30",
                    "service": "Expreso",
                    "via": "Directo"
                },
                {
                    "time": "07:30",
                    "service": "Diferencial",
                    "via": "Directo"
                },
                {
                    "time": "08:00",
                    "service": "Común",
                    "via": "Directo"
                },
                {
                    "time": "09:30",
                    "service": "Expreso",
                    "via": "Directo"
                },
                {
                    "time": "09:31",
                    "service": "Expreso",
                    "via": "Directo"
                },
                {
                    "time": "11:00",
                    "service": "Diferencial",
                    "via": "Directo"
                },
                {
                    "time": "11:30",
                    "service": "Común",
                    "via": "Directo"
                },
                {
                    "time": "13:00",
                    "service": "Expreso",
                    "via": "Directo"
                },
                {
                    "time": "14:00",
                    "service": "Común",
                    "via": "Directo"
                },
                {
                    "time": "14:30",
                    "service": "Diferencial",
                    "via": "Directo"
                },
                {
                    "time": "15:30",
                    "service": "Expreso",
                    "via": "Directo"
                },
                {
                    "time": "17:00",
                    "service": "Expreso",
                    "via": "Directo"
                },
                {
                    "time": "17:30",
                    "service": "Diferencial",
                    "via": "Directo"
                },
                {
                    "time": "18:30",
                    "service": "Expreso",
                    "via": "Directo"
                },
                {
                    "time": "20:00",
                    "service": "Expreso",
                    "via": "Directo"
                },
                {
                    "time": "21:30",
                    "service": "Común",
                    "via": "Directo"
                }
            ],
            "sundays": [
                {
                    "time": "05:15",
                    "service": "Común",
                    "via": "Directo"
                },
                {
                    "time": "06:30",
                    "service": "Expreso",
                    "via": "Directo"
                },
                {
                    "time": "08:00",
                    "service": "Común",
                    "via": "Directo"
                },
                {
                    "time": "09:30",
                    "service": "Expreso",
                    "via": "Directo"
                },
                {
                    "time": "09:31",
                    "service": "Expreso",
                    "via": "Directo"
                },
                {
                    "time": "11:30",
                    "service": "Común",
                    "via": "Directo"
                },
                {
                    "time": "13:00",
                    "service": "Expreso",
                    "via": "Directo"
                },
                {
                    "time": "14:00",
                    "service": "Común",
                    "via": "Directo"
                },
                {
                    "time": "15:30",
                    "service": "Expreso",
                    "via": "Directo"
                },
                {
                    "time": "17:00",
                    "service": "Expreso",
                    "via": "Directo"
                },
                {
                    "time": "18:30",
                    "service": "Expreso",
                    "via": "Directo"
                },
                {
                    "time": "20:00",
                    "service": "Expreso",
                    "via": "Directo"
                },
                {
                    "time": "21:30",
                    "service": "Común",
                    "via": "Directo"
                }
            ]
        }
    },
    {
        "id": "eugeniobustos-tupungato",
        "origin": "eugeniobustos",
        "destination": "tupungato",
        "company": "mitre",
        "line": "Recorrido Eugenio Bustos - Tupungato (Terminal)",
        "platform": "Plataforma 1-4",
        "estimatedPrice": "$1.500",
        "schedules": {
            "weekdays": [
                {
                    "time": "08:35",
                    "service": "Común",
                    "via": "POR C. PRODUCTIVO"
                },
                {
                    "time": "12:30",
                    "service": "Común",
                    "via": "POR C. PRODUCTIVO"
                },
                {
                    "time": "14:30",
                    "service": "Común",
                    "via": "POR C. PRODUCTIVO"
                },
                {
                    "time": "17:30",
                    "service": "Común",
                    "via": "POR C. PRODUCTIVO"
                },
                {
                    "time": "21:05",
                    "service": "Común",
                    "via": "POR C. PRODUCTIVO"
                },
                {
                    "time": "22:05",
                    "service": "Común",
                    "via": "POR C. PRODUCTIVO"
                }
            ],
            "saturdays": [
                {
                    "time": "08:35",
                    "service": "Común",
                    "via": "POR C. PRODUCTIVO"
                },
                {
                    "time": "12:30",
                    "service": "Común",
                    "via": "POR C. PRODUCTIVO"
                },
                {
                    "time": "14:30",
                    "service": "Común",
                    "via": "POR C. PRODUCTIVO"
                },
                {
                    "time": "17:45",
                    "service": "Común",
                    "via": "POR C. PRODUCTIVO"
                },
                {
                    "time": "21:05",
                    "service": "Común",
                    "via": "POR C. PRODUCTIVO"
                },
                {
                    "time": "22:05",
                    "service": "Común",
                    "via": "POR C. PRODUCTIVO"
                }
            ],
            "sundays": [
                {
                    "time": "08:35",
                    "service": "Común",
                    "via": "POR C. PRODUCTIVO"
                },
                {
                    "time": "12:30",
                    "service": "Común",
                    "via": "POR C. PRODUCTIVO"
                },
                {
                    "time": "14:30",
                    "service": "Común",
                    "via": "POR C. PRODUCTIVO"
                },
                {
                    "time": "17:45",
                    "service": "Común",
                    "via": "POR C. PRODUCTIVO"
                },
                {
                    "time": "21:05",
                    "service": "Común",
                    "via": "POR C. PRODUCTIVO"
                },
                {
                    "time": "22:05",
                    "service": "Común",
                    "via": "POR C. PRODUCTIVO"
                }
            ]
        }
    },
    {
        "id": "tupungato-eugeniobustos",
        "origin": "tupungato",
        "destination": "eugeniobustos",
        "company": "mitre",
        "line": "Recorrido Tupungato (Terminal) - Eugenio Bustos",
        "platform": "Plataforma 1-4",
        "estimatedPrice": "$1.500",
        "schedules": {
            "weekdays": [
                {
                    "time": "06:15",
                    "service": "Común",
                    "via": "POR C. PRODUCTIVO"
                },
                {
                    "time": "09:30",
                    "service": "Común",
                    "via": "POR C. PRODUCTIVO"
                },
                {
                    "time": "12:00",
                    "service": "Común",
                    "via": "POR C. PRODUCTIVO"
                },
                {
                    "time": "14:30",
                    "service": "Común",
                    "via": "POR C. PRODUCTIVO"
                },
                {
                    "time": "18:30",
                    "service": "Común",
                    "via": "POR C. PRODUCTIVO"
                },
                {
                    "time": "20:00",
                    "service": "Común",
                    "via": "POR C. PRODUCTIVO"
                }
            ],
            "saturdays": [
                {
                    "time": "06:15",
                    "service": "Común",
                    "via": "POR C. PRODUCTIVO"
                },
                {
                    "time": "09:30",
                    "service": "Común",
                    "via": "POR C. PRODUCTIVO"
                },
                {
                    "time": "12:00",
                    "service": "Común",
                    "via": "POR C. PRODUCTIVO"
                },
                {
                    "time": "14:30",
                    "service": "Común",
                    "via": "POR C. PRODUCTIVO"
                },
                {
                    "time": "18:30",
                    "service": "Común",
                    "via": "POR C. PRODUCTIVO"
                },
                {
                    "time": "20:00",
                    "service": "Común",
                    "via": "POR C. PRODUCTIVO"
                }
            ],
            "sundays": [
                {
                    "time": "06:15",
                    "service": "Común",
                    "via": "POR C. PRODUCTIVO"
                },
                {
                    "time": "09:30",
                    "service": "Común",
                    "via": "POR C. PRODUCTIVO"
                },
                {
                    "time": "12:00",
                    "service": "Común",
                    "via": "POR C. PRODUCTIVO"
                },
                {
                    "time": "14:30",
                    "service": "Común",
                    "via": "POR C. PRODUCTIVO"
                },
                {
                    "time": "18:30",
                    "service": "Común",
                    "via": "POR C. PRODUCTIVO"
                },
                {
                    "time": "20:00",
                    "service": "Común",
                    "via": "POR C. PRODUCTIVO"
                }
            ]
        }
    },
    {
        "id": "tupungato-tunuyan",
        "origin": "tupungato",
        "destination": "tunuyan",
        "company": "mitre",
        "line": "Recorrido Tupungato (Terminal) - Tunuyán (Terminal)",
        "platform": "Plataforma 1-4",
        "estimatedPrice": "$1.500",
        "schedules": {
            "weekdays": [
                {
                    "time": "05:10",
                    "service": "Común",
                    "via": "X CORDON"
                },
                {
                    "time": "05:45",
                    "service": "Común",
                    "via": "X BARBERO"
                },
                {
                    "time": "06:00",
                    "service": "Común",
                    "via": "X ZAMPAL"
                },
                {
                    "time": "07:00",
                    "service": "Común",
                    "via": "X CORDON"
                },
                {
                    "time": "07:01",
                    "service": "Común",
                    "via": "X CORDON"
                },
                {
                    "time": "07:30",
                    "service": "Común",
                    "via": "X DUBOIS"
                },
                {
                    "time": "07:50",
                    "service": "Expreso",
                    "via": "X CORDON"
                },
                {
                    "time": "08:00",
                    "service": "Común",
                    "via": "X CORDON"
                },
                {
                    "time": "09:00",
                    "service": "Común",
                    "via": "X CORDON"
                },
                {
                    "time": "09:30",
                    "service": "Expreso",
                    "via": "X CORDON"
                },
                {
                    "time": "10:00",
                    "service": "Común",
                    "via": "X CORDON"
                },
                {
                    "time": "10:30",
                    "service": "Común",
                    "via": "X CORDON"
                },
                {
                    "time": "11:00",
                    "service": "Común",
                    "via": "X CORDON"
                },
                {
                    "time": "11:30",
                    "service": "Común",
                    "via": "X CORDON"
                },
                {
                    "time": "11:35",
                    "service": "Común",
                    "via": "X CORDON"
                },
                {
                    "time": "12:30",
                    "service": "Común",
                    "via": "X DUBOIS"
                },
                {
                    "time": "12:40",
                    "service": "Común",
                    "via": "X CORDON"
                },
                {
                    "time": "12:45",
                    "service": "Expreso",
                    "via": "X ZAPATA"
                },
                {
                    "time": "13:00",
                    "service": "Común",
                    "via": "X CORDON"
                },
                {
                    "time": "14:00",
                    "service": "Común",
                    "via": "X ZAMPAL"
                },
                {
                    "time": "15:00",
                    "service": "Común",
                    "via": "X CORDON"
                },
                {
                    "time": "15:30",
                    "service": "Común",
                    "via": "X BARBERO"
                },
                {
                    "time": "16:00",
                    "service": "Común",
                    "via": "X CORDON"
                },
                {
                    "time": "16:50",
                    "service": "Expreso",
                    "via": "X CORDON"
                },
                {
                    "time": "17:00",
                    "service": "Común",
                    "via": "X CORDON"
                },
                {
                    "time": "17:01",
                    "service": "Común",
                    "via": "X CORDON"
                },
                {
                    "time": "18:00",
                    "service": "Común",
                    "via": "X CORDON"
                },
                {
                    "time": "18:15",
                    "service": "Expreso",
                    "via": "X ZAPATA"
                },
                {
                    "time": "18:45",
                    "service": "Expreso",
                    "via": "X CORDON"
                },
                {
                    "time": "19:00",
                    "service": "Común",
                    "via": "X CORDON"
                },
                {
                    "time": "20:30",
                    "service": "Común",
                    "via": "X CORDON"
                },
                {
                    "time": "21:30",
                    "service": "Común",
                    "via": "X CORDON"
                },
                {
                    "time": "23:00",
                    "service": "Común",
                    "via": "X CORDON"
                }
            ],
            "saturdays": [
                {
                    "time": "05:30",
                    "service": "Común",
                    "via": "X CORDON"
                },
                {
                    "time": "05:45",
                    "service": "Común",
                    "via": "X BARBERO"
                },
                {
                    "time": "07:00",
                    "service": "Común",
                    "via": "X CORDON"
                },
                {
                    "time": "07:30",
                    "service": "Común",
                    "via": "X ZAMPAL"
                },
                {
                    "time": "08:00",
                    "service": "Común",
                    "via": "X CORDON"
                },
                {
                    "time": "09:00",
                    "service": "Común",
                    "via": "X CORDON"
                },
                {
                    "time": "10:00",
                    "service": "Común",
                    "via": "X CORDON"
                },
                {
                    "time": "11:00",
                    "service": "Común",
                    "via": "X ZAMPAL"
                },
                {
                    "time": "11:30",
                    "service": "Común",
                    "via": "X CORDON"
                },
                {
                    "time": "11:35",
                    "service": "Común",
                    "via": "X CORDON"
                },
                {
                    "time": "13:00",
                    "service": "Común",
                    "via": "X CORDON"
                },
                {
                    "time": "14:00",
                    "service": "Común",
                    "via": "X ZAMPAL"
                },
                {
                    "time": "15:00",
                    "service": "Común",
                    "via": "X CORDON"
                },
                {
                    "time": "15:30",
                    "service": "Común",
                    "via": "X BARBERO"
                },
                {
                    "time": "16:00",
                    "service": "Común",
                    "via": "X CORDON"
                },
                {
                    "time": "17:00",
                    "service": "Común",
                    "via": "X CORDON"
                },
                {
                    "time": "18:00",
                    "service": "Común",
                    "via": "X CORDON"
                },
                {
                    "time": "19:00",
                    "service": "Común",
                    "via": "X CORDON"
                },
                {
                    "time": "20:30",
                    "service": "Común",
                    "via": "X CORDON"
                },
                {
                    "time": "21:30",
                    "service": "Común",
                    "via": "X CORDON"
                },
                {
                    "time": "23:00",
                    "service": "Común",
                    "via": "X CORDON"
                }
            ],
            "sundays": [
                {
                    "time": "05:30",
                    "service": "Común",
                    "via": "X CORDON"
                },
                {
                    "time": "05:45",
                    "service": "Común",
                    "via": "X BARBERO"
                },
                {
                    "time": "07:00",
                    "service": "Común",
                    "via": "X CORDON"
                },
                {
                    "time": "07:30",
                    "service": "Común",
                    "via": "X ZAMPAL"
                },
                {
                    "time": "08:00",
                    "service": "Común",
                    "via": "X CORDON"
                },
                {
                    "time": "09:00",
                    "service": "Común",
                    "via": "X CORDON"
                },
                {
                    "time": "10:00",
                    "service": "Común",
                    "via": "X CORDON"
                },
                {
                    "time": "11:30",
                    "service": "Común",
                    "via": "X CORDON"
                },
                {
                    "time": "11:35",
                    "service": "Común",
                    "via": "X CORDON"
                },
                {
                    "time": "13:00",
                    "service": "Común",
                    "via": "X CORDON"
                },
                {
                    "time": "14:00",
                    "service": "Común",
                    "via": "X ZAMPAL"
                },
                {
                    "time": "15:00",
                    "service": "Común",
                    "via": "X CORDON"
                },
                {
                    "time": "15:30",
                    "service": "Común",
                    "via": "X BARBERO"
                },
                {
                    "time": "16:00",
                    "service": "Común",
                    "via": "X CORDON"
                },
                {
                    "time": "17:00",
                    "service": "Común",
                    "via": "X CORDON"
                },
                {
                    "time": "18:00",
                    "service": "Común",
                    "via": "X CORDON"
                },
                {
                    "time": "19:00",
                    "service": "Común",
                    "via": "X CORDON"
                },
                {
                    "time": "20:30",
                    "service": "Común",
                    "via": "X CORDON"
                },
                {
                    "time": "21:30",
                    "service": "Común",
                    "via": "X CORDON"
                },
                {
                    "time": "23:00",
                    "service": "Común",
                    "via": "X CORDON"
                }
            ]
        }
    },
    {
        "id": "tunuyan-tupungato",
        "origin": "tunuyan",
        "destination": "tupungato",
        "company": "mitre",
        "line": "Recorrido Tunuyán (Terminal) - Tupungato (Terminal)",
        "platform": "Plataforma 1-4",
        "estimatedPrice": "$1.500",
        "schedules": {
            "weekdays": [
                {
                    "time": "06:15",
                    "service": "Común",
                    "via": "X CORDON"
                },
                {
                    "time": "06:16",
                    "service": "Común",
                    "via": "X CORDON"
                },
                {
                    "time": "07:05",
                    "service": "Común",
                    "via": "X ZAMPAL"
                },
                {
                    "time": "07:30",
                    "service": "Común",
                    "via": "X CORDON"
                },
                {
                    "time": "08:05",
                    "service": "Común",
                    "via": "X CORDON"
                },
                {
                    "time": "08:30",
                    "service": "Común",
                    "via": "X CORDON"
                },
                {
                    "time": "08:40",
                    "service": "Expreso",
                    "via": "X CORDON"
                },
                {
                    "time": "09:30",
                    "service": "Común",
                    "via": "X CORDON"
                },
                {
                    "time": "10:25",
                    "service": "Común",
                    "via": "X CORDON"
                },
                {
                    "time": "10:30",
                    "service": "Común",
                    "via": "X CORDON"
                },
                {
                    "time": "11:00",
                    "service": "Expreso",
                    "via": "X CORDON"
                },
                {
                    "time": "11:30",
                    "service": "Común",
                    "via": "X CORDON"
                },
                {
                    "time": "12:00",
                    "service": "Común",
                    "via": "X CORDON"
                },
                {
                    "time": "12:05",
                    "service": "Común",
                    "via": "X CORDON"
                },
                {
                    "time": "12:30",
                    "service": "Común",
                    "via": "X CORDON"
                },
                {
                    "time": "12:31",
                    "service": "Común",
                    "via": "X CORDON"
                },
                {
                    "time": "13:30",
                    "service": "Común",
                    "via": "X CORDON"
                },
                {
                    "time": "13:30",
                    "service": "Expreso",
                    "via": "X ZAPATA"
                },
                {
                    "time": "14:30",
                    "service": "Común",
                    "via": "X BARBERO"
                },
                {
                    "time": "15:00",
                    "service": "Común",
                    "via": "X CORDON"
                },
                {
                    "time": "16:30",
                    "service": "Común",
                    "via": "X CORDON"
                },
                {
                    "time": "17:30",
                    "service": "Común",
                    "via": "X CORDON"
                },
                {
                    "time": "17:40",
                    "service": "Expreso",
                    "via": "X CORDON"
                },
                {
                    "time": "18:30",
                    "service": "Común",
                    "via": "X CORDON"
                },
                {
                    "time": "19:00",
                    "service": "Expreso",
                    "via": "X ZAPATA"
                },
                {
                    "time": "19:00",
                    "service": "Común",
                    "via": "X ZAMPAL"
                },
                {
                    "time": "19:30",
                    "service": "Común",
                    "via": "X CORDON"
                },
                {
                    "time": "19:30",
                    "service": "Expreso",
                    "via": "X CORDON"
                },
                {
                    "time": "20:00",
                    "service": "Común",
                    "via": "X BARBERO"
                },
                {
                    "time": "20:30",
                    "service": "Común",
                    "via": "X CORDON"
                },
                {
                    "time": "21:45",
                    "service": "Común",
                    "via": "X CORDON"
                },
                {
                    "time": "21:46",
                    "service": "Común",
                    "via": "X CORDON"
                },
                {
                    "time": "22:50",
                    "service": "Común",
                    "via": "X CORDON"
                }
            ],
            "saturdays": [
                {
                    "time": "06:15",
                    "service": "Común",
                    "via": "X CORDON"
                },
                {
                    "time": "07:30",
                    "service": "Común",
                    "via": "X CORDON"
                },
                {
                    "time": "08:30",
                    "service": "Común",
                    "via": "X CORDON"
                },
                {
                    "time": "08:31",
                    "service": "Común",
                    "via": "X CORDON"
                },
                {
                    "time": "09:30",
                    "service": "Común",
                    "via": "X CORDON"
                },
                {
                    "time": "09:31",
                    "service": "Común",
                    "via": "X CORDON"
                },
                {
                    "time": "10:30",
                    "service": "Común",
                    "via": "X CORDON"
                },
                {
                    "time": "11:30",
                    "service": "Común",
                    "via": "X CORDON"
                },
                {
                    "time": "12:05",
                    "service": "Común",
                    "via": "X ZAMPAL"
                },
                {
                    "time": "13:00",
                    "service": "Común",
                    "via": "X CORDON"
                },
                {
                    "time": "14:30",
                    "service": "Común",
                    "via": "X BARBERO"
                },
                {
                    "time": "15:00",
                    "service": "Común",
                    "via": "X CORDON"
                },
                {
                    "time": "16:00",
                    "service": "Común",
                    "via": "X CORDON"
                },
                {
                    "time": "17:00",
                    "service": "Común",
                    "via": "X CORDON"
                },
                {
                    "time": "17:30",
                    "service": "Común",
                    "via": "X CORDON"
                },
                {
                    "time": "18:30",
                    "service": "Común",
                    "via": "X CORDON"
                },
                {
                    "time": "19:00",
                    "service": "Común",
                    "via": "X ZAMPAL"
                },
                {
                    "time": "19:30",
                    "service": "Común",
                    "via": "X CORDON"
                },
                {
                    "time": "20:00",
                    "service": "Común",
                    "via": "X BARBERO"
                },
                {
                    "time": "20:30",
                    "service": "Común",
                    "via": "X CORDON"
                },
                {
                    "time": "22:00",
                    "service": "Común",
                    "via": "X CORDON"
                },
                {
                    "time": "23:30",
                    "service": "Común",
                    "via": "X CORDON"
                }
            ],
            "sundays": [
                {
                    "time": "06:15",
                    "service": "Común",
                    "via": "X CORDON"
                },
                {
                    "time": "07:30",
                    "service": "Común",
                    "via": "X CORDON"
                },
                {
                    "time": "07:31",
                    "service": "Común",
                    "via": "X CORDON"
                },
                {
                    "time": "08:30",
                    "service": "Común",
                    "via": "X CORDON"
                },
                {
                    "time": "09:30",
                    "service": "Común",
                    "via": "X CORDON"
                },
                {
                    "time": "10:30",
                    "service": "Común",
                    "via": "X CORDON"
                },
                {
                    "time": "11:30",
                    "service": "Común",
                    "via": "X CORDON"
                },
                {
                    "time": "12:05",
                    "service": "Común",
                    "via": "X ZAMPAL"
                },
                {
                    "time": "13:00",
                    "service": "Común",
                    "via": "X CORDON"
                },
                {
                    "time": "14:30",
                    "service": "Común",
                    "via": "X BARBERO"
                },
                {
                    "time": "15:00",
                    "service": "Común",
                    "via": "X CORDON"
                },
                {
                    "time": "16:30",
                    "service": "Común",
                    "via": "X CORDON"
                },
                {
                    "time": "17:30",
                    "service": "Común",
                    "via": "X CORDON"
                },
                {
                    "time": "18:30",
                    "service": "Común",
                    "via": "X CORDON"
                },
                {
                    "time": "19:00",
                    "service": "Común",
                    "via": "X ZAMPAL"
                },
                {
                    "time": "19:30",
                    "service": "Común",
                    "via": "X CORDON"
                },
                {
                    "time": "20:00",
                    "service": "Común",
                    "via": "X BARBERO"
                },
                {
                    "time": "20:30",
                    "service": "Común",
                    "via": "X CORDON"
                },
                {
                    "time": "22:00",
                    "service": "Común",
                    "via": "X CORDON"
                },
                {
                    "time": "23:00",
                    "service": "Común",
                    "via": "X CORDON"
                }
            ]
        }
    }
]
};
