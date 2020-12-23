-- FUNCTION: public.delete_investigation(integer, integer)

-- DROP FUNCTION public.delete_investigation(integer, integer);

CREATE OR REPLACE FUNCTION public.delete_investigation(
	delete_epi_number integer)
    RETURNS void
    LANGUAGE 'plpgsql'

    COST 100
    VOLATILE 
AS $BODY$
declare

begin

	DELETE FROM public.investigated_patient_symptoms 
		where investigation_id = delete_epi_number;

	DELETE FROM public.exposure 
		where investigation_id = delete_epi_number;

	DELETE FROM public.contacted_person  
		where contact_event	in (select id from public.contact_event where investigation_id = delete_epi_number);

	DELETE FROM public.contact_event
		where investigation_id = delete_epi_number;
		
	DELETE FROM public.involved_contact
		WHERE investigation_id = delete_epi_number;
	
	DELETE FROM public.investigation_settings
		WHERE epidemiology_number = delete_epi_number;

	DELETE FROM public.investigated_patient_background_diseases
		WHERE investigated_patient_id in (select id from public.investigated_patient where covid_patient = delete_epi_number);
		
	DELETE FROM public.investigated_patient
		where covid_patient = delete_epi_number;

	DELETE FROM public.covid_patients
		WHERE epidemiology_number = delete_epi_number;
	
	DELETE FROM public.investigated_patient_symptoms
		WHERE investigation_id = delete_epi_number;
	
    DELETE FROM public.investigation
		WHERE epidemiology_number = delete_epi_number;
		
end;
$BODY$;
