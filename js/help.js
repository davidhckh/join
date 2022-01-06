function openCategory(evt, category) {
    // Declare all variables
    var i, tabcontent, tablinks;

    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(category).style.display = "flex";
    evt.currentTarget.className += " active";

}

function helpInit() {
    document.getElementById('helpFirstSteps').style.display = "block";
}

/**
 * english-german imprint
 */


function showEnglishImprint() {
    let imprint = document.getElementById('imprintWrap');
    imprint.innerHTML = "";
    imprint.innerHTML = `<h1>Website Terms and Conditions of Use</h1>
    <h2>1. Terms</h2>   
    <p>By accessing this Website, accessible from join, you are agreeing to be bound by these Website Terms and Conditions of Use and agree that you are responsible for the agreement with any applicable local laws. If you disagree with any of these terms, you are prohibited from accessing this site. The materials contained in this Website are protected by copyright and trade mark law.</p> 
    <h2>2. Use License</h2>  
    <p>Permission is granted to temporarily download one copy of the materials on join's Website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:</p>   
    <ul>
        <li>modify or copy the materials;</li>
        <li>use the materials for any commercial purpose or for any public display;</li>
        <li>attempt to reverse engineer any software contained on join's Website;</li>
        <li>remove any copyright or other proprietary notations from the materials; or</li>
        <li>transferring the materials to another person or "mirror" the materials on any other server.</li>
    </ul>
    <p>This will let join to terminate upon violations of any of these restrictions. Upon termination, your viewing right will also be terminated and you should destroy any downloaded materials in your possession whether it is printed or electronic format. These Terms of Service has been created with the help of the <a href="https://www.termsofservicegenerator.net">Terms Of Service Generator</a>.</p>
    <h2>3. Disclaimer</h2>
    <p>All the materials on join’s Website are provided "as is". join makes no warranties, may it be expressed or implied, therefore negates all other warranties. Furthermore, join does not make any representations concerning the accuracy or reliability of the use of the materials on its Website or otherwise relating to such materials or any sites linked to this Website.</p>  
    <h2>4. Limitations</h2>  
    <p>join or its suppliers will not be hold accountable for any damages that will arise with the use or inability to use the materials on join’s Website, even if join or an authorize representative of this Website has been notified, orally or written, of the possibility of such damage. Some jurisdiction does not allow limitations on implied warranties or limitations of liability for incidental damages, these limitations may not apply to you.</p>
    <h2>5. Revisions and Errata</h2>
    <p>The materials appearing on join’s Website may include technical, typographical, or photographic errors. join will not promise that any of the materials in this Website are accurate, complete, or current. join may change the materials contained on its Website at any time without notice. join does not make any commitment to update the materials.</p> 
    <h2>6. Links</h2>
    <p>join has not reviewed all of the sites linked to its Website and is not responsible for the contents of any such linked site. The presence of any link does not imply endorsement by join of the site. The use of any linked website is at the user’s own risk.</p>
    <h2>7. Site Terms of Use Modifications</h2>
    <p>join may revise these Terms of Use for its Website at any time without prior notice. By using this Website, you are agreeing to be bound by the current version of these Terms and Conditions of Use.</p> 
    <h2>8. Your Privacy</h2> 
    <p>Please read our Privacy Policy.</p>    
    <h2>9. Governing Law</h2> 
    <p>Any claim related to join's Website shall be governed by the laws of de without regards to its conflict of law provisions.</p>`;
}

function showGermanImprint() {
    let imprint = document.getElementById('imprintWrap');
    imprint.innerHTML = "";
    imprint.innerHTML = `
    <h3>Impressum</h3>
    <p>
        Angaben gemäß § 5 TMG <br> Nils Spiller <br>David Heckhoff <br>Sebastian Funke <br>Kontakt <br>E-Mail: contact@tzwoelfe.de <br> Redaktionell Verantwortlicher Betreiber <br>Verbraucherstreitbeilegung/Universalschlichtungsstelle
        <br>Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen. <br> <br> Haftung für Inhalte <br>Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte
        auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach § 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu
        forschen, die auf eine rechtswidrige Tätigkeit hinweisen. <br> <br> Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung
        ist jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden Rechtsverletzungen werden wir diese Inhalte umgehend entfernen. <br> <br>Haftung für Links <br> Unser
        Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige
        Anbieter oder Betreiber der Seiten verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft. Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar. <br>Eine
        permanente inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne konkrete Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Links umgehend entfernen. <br>Urheberrecht
        <br> Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes
        bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers. Downloads und Kopien dieser Seite sind nur für den privaten, nicht kommerziellen Gebrauch gestattet. <br> Soweit die Inhalte auf dieser Seite nicht vom
        Betreiber erstellt wurden, werden die Urheberrechte Dritter beachtet. Insbesondere werden Inhalte Dritter als solche gekennzeichnet. Sollten Sie trotzdem auf eine Urheberrechtsverletzung aufmerksam werden, bitten wir um einen entsprechenden
        Hinweis. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Inhalte umgehend entfernen. <br>
    </p>
    <hr> Logos stammen u. A.von <a href="https://icons8.com">https://icons8.com</a>
    `;
}