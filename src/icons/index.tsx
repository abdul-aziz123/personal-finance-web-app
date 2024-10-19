import React from "react";

export function IconBillDue({ className }: { className?: string }) {
  return (
    <svg
      fill="none"
      height={14}
      viewBox="0 0 14 14"
      width={14}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="m7 .5c-1.28558 0-2.54228.381218-3.6112 1.09545-1.06892.71423-1.90204 1.72939-2.394014 2.91711-.49197 1.18772-.620691 2.49465-.369887 3.75553.250804 1.26087.869871 2.41911 1.778911 3.32811s2.06723 1.5281 3.32811 1.7789c1.26087.2508 2.56781.1221 3.75552-.3699 1.18776-.492 2.20286-1.3251 2.91716-2.394.7142-1.06891 1.0954-2.32562 1.0954-3.6112-.0018-1.72335-.6872-3.37559-1.9058-4.59418-1.2186-1.2186-2.87085-1.904-4.5942-1.90582zm-.5 3.5c0-.13261.05268-.25979.14645-.35355.09377-.09377.22094-.14645.35355-.14645s.25979.05268.35356.14645c.09376.09376.14644.22094.14644.35355v3.5c0 .13261-.05268.25979-.14644.35355-.09377.09377-.22095.14645-.35356.14645s-.25978-.05268-.35355-.14645c-.09377-.09376-.14645-.22094-.14645-.35355zm.5 6.5c-.14833 0-.29334-.044-.41667-.1264-.12334-.0824-.21947-.1995-.27624-.3366-.05676-.13703-.07162-.28783-.04268-.43332.02894-.14548.10037-.27912.20526-.38401s.23853-.17632.38401-.20526c.14549-.02894.29629-.01408.43333.04268.13705.05677.25418.1529.33659.27623.08242.12334.1264.26834.1264.41668 0 .19891-.07902.3897-.21967.5303-.14065.1407-.33141.2197-.53033.2197z"
        fill="#c94736"
        className={className ? className : ""}
      />
    </svg>
  );
}

export function IconCaretRight({ className }: { className?: string }) {
  return (
    <svg
      fill="none"
      height={13}
      viewBox="0 0 6 11"
      width={13}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="m.853506.146465 5.000004 5.000005c.04648.04643.08336.10158.10853.16228.02516.06069.03811.12576.03811.19147 0 .0657-.01295.13077-.03811.19147-.02517.06069-.06205.11584-.10853.16228l-5.000004 5.00003c-.069927.07-.159054.1177-.256097.137-.097042.0193-.197637.0094-.289048-.0285-.091412-.0378-.16953-.102-.2244652-.1843-.0549354-.0823-.08421767-.179-.08413981-.278l-.00000043-9.999984c-.00007788-.098949.02920444-.195695.08413984-.277992.0549356-.082297.1330536-.1464431.2244646-.1843193.091412-.03787611.192007-.04777907.289049-.02845381.097042.01932521.186169.06700801.256097.13701411z"
        fill="#696868"
        className={className ? className : ""}
      />
    </svg>
  );
}

export function IconCaretLeft({ className }: { className?: string }) {
  return (
    <svg
      fill="none"
      height={13}
      viewBox="0 0 6 11"
      width={13}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="m5.14656 10.8535-5.000005-4.99997c-.046488-.04643-.0833676-.10158-.1085298-.16228-.0251623-.06069-.03811269-.12576-.0381127-.19147 0-.0657.0129504-.13077.0381126-.19147.0251623-.06069.0620419-.11584.1085299-.16228l4.999995-4.999997c.06993-.0700052.15906-.117689.2561-.13701419.09704-.01932521.19764-.0094229.28905.02845329.09141.0378763.16953.1020229.22447.1843199.05493.082297.08421.179044.08414.277991v10.000017c.00007.0989-.02921.1957-.08414.278-.05494.0823-.13306.1464-.22447.1843s-.19201.0478-.28905.0284c-.09704-.0193-.18617-.067-.25609-.137z"
        fill="#696868"
        className={className ? className : ""}
      />
    </svg>
  );
}

export function IconSearch({ className }: { className?: string }) {
  return (
    <svg
      fill="none"
      height={14}
      viewBox="0 0 14 14"
      width={14}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="m13.3538 13.1462-3.1294-3.1287c.907-1.08894 1.3593-2.48564 1.2628-3.89955-.0966-1.41391-.7345-2.73618-1.78109-3.69173-1.0466-.95555-2.42131-1.470821-3.83815-1.438621-1.41683.032201-2.76671.609391-3.76883 1.611501-1.00211 1.00212-1.579301 2.352-1.611501 3.76883-.0322 1.41684.483071 2.79155 1.438621 3.83817.95556 1.0466 2.27782 1.6845 3.69173 1.781 1.41391.0966 2.81061-.3557 3.89954-1.2627l3.12878 3.1293c.0464.0465.1016.0833.1623.1085.0607.0251.1257.0381.1914.0381s.1308-.013.1915-.0381c.0607-.0252.1158-.062.1623-.1085.0464-.0464.0833-.1016.1084-.1623.0252-.0607.0381-.1257.0381-.1914s-.0129-.1308-.0381-.1915c-.0251-.0607-.062-.1158-.1084-.1623zm-11.85378-6.64621c0-.89002.26392-1.76005.75839-2.50007.49446-.74002 1.19727-1.31679 2.01954-1.65739.82226-.34059 1.72706-.42971 2.59998-.25607.87291.17363 1.67473.60221 2.30407 1.23155s1.0579 1.43116 1.2316 2.30407c.1736.87292.0845 1.77772-.2561 2.59999-.34062.82226-.91739 1.52507-1.65741 2.01953-.74002.4945-1.61005.7584-2.50007.7584-1.19307-.0013-2.33689-.4759-3.18052-1.31949-.84363-.84363-1.31816-1.98745-1.31948-3.18052z"
        fill="#201f24"
        className={className ? className : ""}
      />
    </svg>
  );
}

export function IconMinimize({ className }: { className?: string }) {
  return (
    <svg
      fill="none"
      height={19.5}
      viewBox="0 0 20 20"
      width={19.5}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="m14.0001 5.26002v8.99998c0 .1989-.079.3897-.2197.5304-.1406.1406-.3314.2196-.5303.2196h-2.25v3.75c.0001.1484-.0438.2936-.1262.417-.0824.1235-.1996.2197-.3367.2765s-.288.0717-.4336.0427c-.14554-.029-.27923-.1005-.38412-.2056l-9.000003-9c-.069733-.0696-.125052-.1523-.162795-.2434-.037743-.09102-.05717-.18862-.05717-.28718s.019427-.19615.05717-.2872.093062-.17377.162795-.24342l9.000003-9.000004c.10489-.105009.23858-.1765346.38412-.2055224.1456-.02898777.2965-.0141343.4336.0426801.1371.0568143.2543.1530353.3367.2764803s.1263.268565.1262.416987v3.749999h2.25c.1989 0 .3897.07902.5303.21967.1407.14065.2197.33142.2197.53033zm2.25-.75c-.1989 0-.3897.07902-.5303.21967-.1407.14065-.2197.33142-.2197.53033v8.99998c0 .1989.079.3897.2197.5304.1406.1406.3314.2196.5303.2196s.3897-.079.5303-.2196c.1407-.1407.2197-.3315.2197-.5304v-8.99998c0-.19891-.079-.38968-.2197-.53033-.1406-.14065-.3314-.21967-.5303-.21967zm3 0c-.1989 0-.3897.07902-.5303.21967-.1407.14065-.2197.33142-.2197.53033v8.99998c0 .1989.079.3897.2197.5304.1406.1406.3314.2196.5303.2196s.3897-.079.5303-.2196c.1407-.1407.2197-.3315.2197-.5304v-8.99998c0-.19891-.079-.38968-.2197-.53033-.1406-.14065-.3314-.21967-.5303-.21967z"
        fill="#b3b3b3"
        className={className ? className : ""}
      />
    </svg>
  );
}

export function IconLogoLarge({ className }: { className?: string }) {
  return (
    <svg
      fill="none"
      height={22}
      viewBox="0 0 122 22"
      width={122}
      xmlns="http://www.w3.org/2000/svg"
    >
      <g fill="#fff" className={className ? className : ""}>
        <path d="m8.192 21.44h-6.016v-11.2h-2.176v-4.928h2.304c.64-3.04 3.616-5.312 8.896-5.312h1.28v4.288h-2.24c-1.664 0-2.464.16-2.432 1.024h4.672v4.928h-4.288z" />
        <path d="m20.1047 3.84h-6.016v-3.84h6.016zm0 17.6h-6.016v-16.128h6.016z" />
        <path d="m28.3622 21.44h-6.016v-16.128h5.6321v4.896h.32c.3519-2.688 2.112-5.216 6.432-5.216 4.352 0 6.3999 2.624 6.3999 6.112v10.336h-6.0159v-8.128c0-2.24-.8321-2.944-3.4561-2.944-2.656 0-3.296.672-3.296 2.752z" />
        <path d="m48.4447 21.76c-3.648 0-5.696-1.664-5.696-4.416 0-2.272 1.568-3.904 5.216-4.256l6.56-.64v-.32c0-1.632-.7039-1.888-2.8479-1.888-1.9841 0-2.592.384-2.592 1.728v.128h-6.0161v-.064c0-4.288 3.584-7.04 9.056-7.04 5.632 0 8.352 2.752 8.352 7.264v9.184h-5.632v-3.392h-.32c-.608 2.272-2.592 3.712-6.08 3.712zm.352-4.8c0 .512.512.608 1.44.608 2.912 0 4.096-.352 4.256-1.792l-4.9279.576c-.544.064-.7681.256-.7681.608z" />
        <path d="m68.596 21.44h-6.016v-16.128h5.632v4.896h.32c.352-2.688 2.112-5.216 6.432-5.216 4.352 0 6.4 2.624 6.4 6.112v10.336h-6.016v-8.128c0-2.24-.832-2.944-3.456-2.944-2.656 0-3.296.672-3.296 2.752z" />
        <path d="m92.5185 21.76c-5.728 0-9.376-3.168-9.376-8.384 0-5.248 3.648-8.384 9.376-8.384 5.504 0 9.0235 2.816 9.0235 7.136v.512h-5.9835v-.256c0-1.664-1.216-2.016-3.168-2.016-2.208 0-3.264.48-3.264 3.008 0 2.496 1.056 2.976 3.264 2.976 1.952 0 3.168-.32 3.168-1.984v-.288h5.9835v.544c0 4.288-3.5195 7.136-9.0235 7.136z" />
        <path d="m112.462 21.76c-5.472 0-9.312-2.336-9.312-8.384 0-5.248 3.808-8.384 9.184-8.384 5.568 0 9.12 2.784 9.12 7.968 0 .544-.032.96-.096 1.536h-12.64c.096 1.952.96 2.496 3.52 2.496 2.432 0 3.072-.416 3.072-1.376v-.352h6.016v.384c0 3.584-3.424 6.112-8.864 6.112zm-.256-12.16c-2.208 0-3.136.48-3.392 1.856h6.816c-.224-1.376-1.184-1.856-3.424-1.856z" />
      </g>
    </svg>
  );
}
