import {SectionsFooter} from "../core/components/footer/domain/interfaces/section-footer";

export const sectionsFooter:SectionsFooter[]=[
        {id: "1",
            title: "Comercio Chino",
            links: [{name: "¿Quiénes somos?", url: "/quienessomos.html"},
                {name: "Prensa", url: "/quienessomos.html"},
                {name: "Empleo", url: "/empleo.html"},
                {name: "Equipo", url: "/equipo.html"}]
        },
        {id: "2",
            title: "Soporte",
            links: [{name: "Preguntas Frecuentes", url: "/quienessomos.html"},
            {name: "Reglas de convivencia", url: "/quienessomos.html"},
            {name: "Consejos de seguridad", url: "/empleo.html"}]
        },
        {id: "3",
            title: "Legal",
            links: [{name: "Condiciones de uso", url: "/quienessomos.html"},
            {name: "Política de privacidad", url: "/quienessomos.html"},
            {name: "Cookies", url: "/empleo.html"}]
        }
    ]
